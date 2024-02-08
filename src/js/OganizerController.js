import AsidePanelController from './AsidePanelController';
import StickeProcessing from './Message Processing/StickerProcessing';
import TextInputProcessing from './Message Processing/TextInputProcessing';

export default class OrganizerController {
  constructor(widget, communicator, geolocator, errMessage, toolTip, informWidget) {
    this.widget = widget;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.toolTip = toolTip;
    this.informWidget = informWidget;

    this.aside = null;
    this.enterText = null;
    this.sticker = null;

    this.messagingOpen = this.messagingOpen.bind(this);
    this.messagingClose = this.messagingClose.bind(this);
    this.messagingError = this.messagingError.bind(this);
    this.messagingReader = this.messagingReader.bind(this);
    this.filtrationMessagesList = this.filtrationMessagesList.bind(this);
    this.showPinnedMessage = this.showPinnedMessage.bind(this);

    this.addToFavoritesMessage = this.addToFavoritesMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.pinMessage = this.pinMessage.bind(this);
    this.messageListeners = {
      favorites: this.addToFavoritesMessage,
      delete: this.deleteMessage,
      pinned: this.pinMessage,
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
        && e.target !== this.sticker.btnSticker) this.sticker.toggleVisabilitySticker();
    });

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
  }

  messagingOpen(e) {
    console.log('Соединение с сервером установлено', e);

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
  }

  messagingClose(e) {
    console.log('соединение с сервером закрыто', e);
    this.informWidget.showMessage('Соединение с сервером закрыто. Попробуйте перезапустить приложение.');
  }

  messagingError(e) {
    console.log('произошла ошибка', e);
    this.errMessage.showMessage('Произошла ошибка соединения с сервером. Попробуйте перезапустить приложение.');
  }

  messagingReader(e) {
    const { listCounters, listMessages } = JSON.parse(e.data);

    console.log('incoming message: ', e.data);

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
    this.communicator.getMessagesByFilter(filter).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отфильтровать сообщения');
    }).then((data) => {
      if (data) {
        this.widget.clearMessagesList();
        if (data) {
          this.widget.readMessagesList(
            data,
            this.messageListeners,
            this.showPinnedMessage,
            this.communicator.deletePinnedStatus,
          );
        }
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
      e.target.closest('li').remove();
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
          this.showPinnedMessage,
          this.communicator.deletePinnedStatus,
        );
      }).catch((err) => {
        this.errMessage.showMessage(err.message);
      });
    }
  }
}
