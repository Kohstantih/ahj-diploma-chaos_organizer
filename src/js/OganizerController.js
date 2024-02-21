import AsidePanelController from './AsidePanelController';
import StickeProcessing from './Message Processing/StickerProcessing';
import TextInputProcessing from './Message Processing/TextInputProcessing';
import createDownloadLink from './createDownloadLink';

export default class OrganizerController {
  constructor(
    widget,
    communicator,
    geolocator,
    errMessage,
    toolTip,
    informWidget,
    bot,
    media,
    fileController,
    searcher,
  ) {
    this.widget = widget;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.toolTip = toolTip;
    this.informWidget = informWidget;
    this.bot = bot;
    this.media = media;
    this.fileController = fileController;
    this.searcher = searcher;

    this.aside = null;
    this.enterText = null;
    this.sticker = null;

    this.activeFilter = 'all';

    this.messagingOpen = this.messagingOpen.bind(this);
    this.messagingClose = this.messagingClose.bind(this);
    this.messagingError = this.messagingError.bind(this);
    this.messagingReader = this.messagingReader.bind(this);
    this.filtrationMessagesList = this.filtrationMessagesList.bind(this);
    this.showPinnedMessage = this.showPinnedMessage.bind(this);
    this.showSearchMessage = this.showSearchMessage.bind(this);
    this.scrollToOldMessage = this.scrollToOldMessage.bind(this);
    this.addOldMessages = this.addOldMessages.bind(this);

    this.addToFavoritesMessage = this.addToFavoritesMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.pinMessage = this.pinMessage.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.messageListeners = {
      favorites: this.addToFavoritesMessage,
      delete: this.deleteMessage,
      pinned: this.pinMessage,
      download: this.downloadFile,
    };
  }

  activation() {
    this.widget.container.addEventListener('click', (e) => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();

      if (this.enterText
        && this.enterText.emojiStatus
        && e.target !== this.enterText.btn) this.enterText.toggleVisabilityEmoji();

      if (this.sticker
        && this.sticker.stickerStatus
        && e.target !== this.sticker.btnSticker
        && !e.target.closest('.sticker_box')) this.sticker.toggleVisabilitySticker();

      if (this.bot.isFairTarget(e.target)) this.bot.validationBotStatus();

      if (this.media.stream && !e.target.closest('.organizer_footer')) e.stopImmediatePropagation();

      if (this.searcher.searchStatus && !e.target.closest('.options_wrapper')) this.searcher.stopStream();
    }, { capture: true });

    this.widget.messageListWrapper.addEventListener('scroll', this.scrollToOldMessage);

    this.communicator.messaging(
      this.messagingOpen,
      this.messagingClose,
      this.messagingError,
      this.messagingReader,
    );

    this.aside = new AsidePanelController(
      this.widget.asidePanel,
      this.widget.asideBtn,
      this.filtrationMessagesList,
    );
    this.aside.activation();

    this.bot.activation();
    this.searcher.activation(this.showSearchMessage);
  }

  scrollToOldMessage() {
    const scrolledElTop = this.widget.messageListWrapper.getBoundingClientRect().top;
    const messageListTop = this.widget.messageList.getBoundingClientRect().top;

    if (scrolledElTop === messageListTop) this.addOldMessages(10);
  }

  addOldMessages(count) {
    const message = this.widget.findOldestMessage();

    if (message) {
      const { id } = message.dataset;

      this.communicator.getMessagesByFilter(this.activeFilter, count, id).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось загрузить более старые сообщения');
      }).then((data) => {
        if (data) {
          if (data) {
            this.widget.readMessagesList(
              data.reverse(),
              this.messageListeners,
              this.showPinnedMessage,
              this.communicator.deletePinnedStatus,
              true,
            );
          }
          return;
        }
        throw new Error('Не удалось обработать ответ сервера');
      }).catch((err) => {
        this.errMessage.showMessage(err.message);
      });
    }
  }

  messagingOpen() {
    this.enterText = new TextInputProcessing(
      this.widget.enterText,
      this.widget.emojiBtn,
      this.widget.emojiBox,
      this.communicator.ws,
      this.geolocator.getCoordinates,
      this.toolTip,
    );
    this.enterText.activation();

    this.sticker = new StickeProcessing(
      this.widget.footer,
      this.communicator.ws,
      this.geolocator.getCoordinates,
    );
    this.sticker.activation();

    this.media.activation();

    this.fileController.activation();
  }

  messagingClose() {
    this.informWidget.showMessage('Соединение с сервером закрыто. Попробуйте перезапустить приложение.');
  }

  messagingError() {
    this.errMessage.showMessage('Произошла ошибка соединения с сервером. Попробуйте перезапустить приложение.');
  }

  messagingReader(e) {
    const { listCounters, listMessages } = JSON.parse(e.data);

    if (listMessages && listMessages.length !== 0) {
      this.widget.readMessagesList(
        listMessages,
        this.messageListeners,
        this.showPinnedMessage,
        this.communicator.deletePinnedStatus,
      );

      OrganizerController.scrollToMessage(this.widget.lastMessage);

      this.aside.updateCountAll(listCounters);
    }
  }

  static scrollToMessage(element) {
    if (element) {
      element.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }

  filtrationMessagesList(filter) {
    this.activeFilter = filter;

    this.communicator.getMessagesByFilter(filter, 10).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отфильтровать сообщения');
    }).then((data) => {
      if (data) {
        this.widget.clearMessagesList();
        this.widget.readMessagesList(
          data,
          this.messageListeners,
          this.showPinnedMessage,
          this.communicator.deletePinnedStatus,
        );
        return;
      }
      throw new Error('Не удалось обработать ответ сервера');
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  addToFavoritesMessage(e) {
    const { id } = e.target.closest('li').dataset;

    this.communicator.changeFavoritesStatus(id).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось изменить статус сообщения');
    }).then((data) => {
      const { favoritesCount } = data;
      this.aside.updateCount('favorites', favoritesCount);
      this.widget.changeFavoritesStatus(e.target);
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  deleteMessage(e) {
    const { id } = e.target.closest('li').dataset;

    this.communicator.requestDeleteMessage(id).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось удалить сообщение');
    }).then((data) => {
      this.widget.delMessage(e.target.closest('li'));

      if (this.widget.messageBox.length < 10) this.addOldMessages(1);

      this.aside.updateCountAll(data.listCounters);
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  pinMessage(e) {
    const { id } = e.target.closest('li').dataset;

    this.communicator.changePinnedStatus(id).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось закрепить сообщение');
    }).then((data) => {
      this.widget.adPinnedMessage(
        data.pinnedMessage,
        this.showPinnedMessage,
        this.communicator.deletePinnedStatus,
      );
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  downloadFile(e) {
    this.communicator.downloadFileFromServer(e.target.dataset.url).then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Не удалось скачать файл');
    }).then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      const link = createDownloadLink(objectURL, e.target.dataset.name);

      link.click();
      link.remove();
      URL.revokeObjectURL(objectURL);
    });
  }

  showPinnedMessage(e) {
    if (!e.target.classList.contains('btn-delete_pinned')) {
      this.communicator.getPinnedMessage().then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Не удалось загрузить закреплённое сообщение');
      }).then((data) => {
        this.widget.renderPinnedMessage(
          data.pinnedMessage,
          this.messageListeners,
        );
      }).catch((err) => {
        this.errMessage.showMessage(err.message);
      });
    }
  }

  showSearchMessage(obj) {
    this.widget.renderSearchMessage(
      obj,
      this.messageListeners,
    );
  }
}
