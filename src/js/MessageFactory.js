import CreationElements from './CreationElements';
import validationFileName from './validationFileName';

export default class MessageFactory {
  constructor(port) {
    this.port = port;

    this.createTextContent = this.createTextContent.bind(this);
    this.createLinkContent = this.createLinkContent.bind(this);
    this.createSticker = this.createSticker.bind(this);
    this.createAudioContent = this.createAudioContent.bind(this);
    this.createVideoContent = this.createVideoContent.bind(this);
    this.createImageContent = this.createImageContent.bind(this);
    this.createOtherContent = this.createOtherContent.bind(this);

    this.typesList = {
      text: this.createTextContent,
      links: this.createLinkContent,
      sticker: this.createSticker,
      audio: this.createAudioContent,
      video: this.createVideoContent,
      image: this.createImageContent,
      other: this.createOtherContent,
    };

    this.messageObj = null;
    this.listeners = null;
  }

  createMessage(messageObj, callbacks) {
    this.messageObj = messageObj;
    this.listeners = callbacks;

    const messageEl = CreationElements.createElement('li', ['message']);
    messageEl.dataset.id = messageObj.id;

    const favorites = this.createBtnFavorites();
    messageEl.append(favorites);

    const contentBox = CreationElements.createElement('div', ['message_content']);
    if (this.messageObj.fileStatus && this.messageObj.type !== 'other') {
      const fileTitle = CreationElements.createElement('h4', ['message_content-title']);
      fileTitle.textContent = validationFileName(this.messageObj.fileName, 25);
      contentBox.append(fileTitle);
    }

    const content = this.createContent();
    contentBox.append(content);

    const footer = this.createFooter();
    contentBox.append(footer);
    messageEl.append(contentBox);

    const btnsBox = this.createBtnsBox();
    messageEl.append(btnsBox);

    this.messageObj = null;
    this.listeners = null;

    return messageEl;
  }

  createBtnFavorites() {
    const favoritesClasses = this.messageObj.favorites ? ['mark_favorites', 'active_favorites'] : ['mark_favorites', 'inactive_favorites'];
    const favorites = CreationElements.createElement('button', favoritesClasses, [{ name: 'type', value: 'button' }]);
    favorites.addEventListener('click', this.listeners.favorites);

    return favorites;
  }

  createContent() {
    return this.typesList[this.messageObj.type]();
  }

  createFooter() {
    const footer = CreationElements.createElement('div', ['message_footer']);
    const dateEl = CreationElements.createElement('span', ['message_date', 'message_footer-item']);
    dateEl.textContent = this.messageObj.date;
    const locationEl = CreationElements.createElement('span', ['message_location', 'message_footer-item']);
    locationEl.textContent = this.messageObj.location;
    footer.append(dateEl);
    footer.append(locationEl);

    return footer;
  }

  createBtnsBox() {
    const btnsBox = CreationElements.createElement('div', ['message_btns-ctrl']);
    const btnDel = CreationElements.createElement('button', ['del-messaage', 'message-ctrl_btn'], [{ name: 'type', value: 'button' }]);
    btnDel.addEventListener('click', this.listeners.delete);
    const btnPin = CreationElements.createElement('button', ['pinned-message', 'message-ctrl_btn'], [{ name: 'type', value: 'button' }]);
    btnPin.addEventListener('click', this.listeners.pinned);
    btnsBox.append(btnDel);
    btnsBox.append(btnPin);

    if (this.messageObj.fileStatus) {
      const download = CreationElements.createElement('button', ['download_message', 'message-ctrl_btn'], [{ name: 'type', value: 'button' }]);
      download.dataset.url = this.messageObj.message.link;
      download.dataset.name = this.messageObj.fileName;
      download.addEventListener('click', this.listeners.download);
      btnsBox.append(download);
    }

    return btnsBox;
  }

  createTextContent() {
    const result = CreationElements.createElement('p', ['message_text']);
    result.textContent = this.messageObj.message;

    return result;
  }

  createLinkContent() {
    const result = CreationElements.createElement(
      'a',
      ['message_link'],
      [
        { name: 'href', value: this.messageObj.message },
        { name: 'target', value: '_blank' },
      ],
    );
    const text = this.messageObj.message;
    result.textContent = text.length > 50 ? `${text.slice(0, 50)}...` : text;

    return result;
  }

  createSticker() {
    const result = CreationElements.createElement('div', ['message_sticker', `${this.messageObj.message.className}`]);

    return result;
  }

  createAudioContent() {
    const result = CreationElements.createElement(
      'audio',
      ['content_media'],
      [
        { name: 'src', value: `${this.port}${this.messageObj.message.link}` },
        { name: 'controls', value: true },
      ],
    );

    return result;
  }

  createVideoContent() {
    const result = CreationElements.createElement(
      'video',
      ['content_media'],
      [
        { name: 'src', value: `${this.port}${this.messageObj.message.link}` },
        { name: 'controls', value: true },
      ],
    );

    return result;
  }

  createImageContent() {
    const result = CreationElements.createElement(
      'img',
      ['message_image'],
      [
        { name: 'src', value: `${this.port}${this.messageObj.message.link}` },
      ],
    );

    return result;
  }

  createOtherContent() {
    const result = CreationElements.createElement(
      'p',
      ['message_other'],
    );

    result.textContent = validationFileName(this.messageObj.fileName, 35);

    result.dataset.url = this.messageObj.message.link;
    result.dataset.name = this.messageObj.fileName;

    return result;
  }
}
