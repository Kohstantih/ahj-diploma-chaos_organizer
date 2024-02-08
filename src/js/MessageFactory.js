import CreationElements from './CreationElements';

export default class MessageFactory {
  constructor() {
    this.createTextContent = this.createTextContent.bind(this);
    this.createSticker = this.createSticker.bind(this);

    this.typesList = {
      text: this.createTextContent,
      sticker: this.createSticker,
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
    const btnsBox = CreationElements.createElement('div', ['message_btns-ctrl', 'hidden']);
    const btnDel = CreationElements.createElement('button', ['del-messaage', 'message-ctrl_btn'], [{ name: 'type', value: 'button' }]);
    btnDel.addEventListener('click', this.listeners.delete);
    const btnPin = CreationElements.createElement('button', ['pinned-message', 'message-ctrl_btn'], [{ name: 'type', value: 'button' }]);
    btnPin.addEventListener('click', this.listeners.pinned);
    btnsBox.append(btnDel);
    btnsBox.append(btnPin);

    return btnsBox;
  }

  createTextContent() {
    const result = CreationElements.createElement('p', ['message_text']);
    result.textContent = this.messageObj.message;

    return result;
  }

  createSticker() {
    const result = CreationElements.createElement('div', ['message_sticker', `${this.messageObj.message.className}`]);

    return result;
  }
}
