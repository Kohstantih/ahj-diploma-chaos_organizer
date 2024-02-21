export default class OrganizerWidget {
  constructor(container, factory, pinned) {
    this.container = container;
    this.factory = factory;
    this.pinned = pinned;

    this.messageListWrapper = this.container.querySelector('.message-list_wrapper');
    this.messageList = this.messageListWrapper.querySelector('.message-list');
    this.asidePanel = this.container.querySelector('.organizer_aside');
    this.asideBtn = this.container.querySelector('.toggle-aside_btn');
    this.footer = this.container.querySelector('.organizer_footer');
    this.enterText = this.footer.querySelector('.enter-text');
    this.emojiBtn = this.footer.querySelector('.add-emoji_btn');
    this.emojiBox = this.footer.querySelector('.emoji_box');

    this.activeMessageClass = 'active_favorites';
    this.inactiveMessageClass = 'inactive_favorites';

    this.lastMessage = null;
    this.messageBox = [];
  }

  readMessagesList(messagesList, listeners, showPinned, reqDelPinned, scroll) {
    messagesList.forEach((m) => this.addMessage(m, listeners, showPinned, reqDelPinned, scroll));
  }

  addMessage(obj, listenersList, showPinned, reqDeletePinned, scroll) {
    this.renderMessage(this.factory.createMessage(obj, listenersList), scroll);
    if (obj.pinned && showPinned) this.adPinnedMessage(obj, showPinned, reqDeletePinned);
  }

  renderMessage(element, scroll) {
    this.lastMessage = element;
    if (scroll) {
      this.messageList.prepend(element);
      this.messageBox.unshift(element);
    } else {
      this.messageList.append(element);
      this.messageBox.push(element);
    }

    if (this.messageBox.length > 10 && !scroll) this.delMessage(this.messageBox[0]);
  }

  changeFavoritesStatus(element) {
    element.classList.toggle(this.activeMessageClass);
    element.classList.toggle(this.inactiveMessageClass);
  }

  adPinnedMessage(messageObj, showPinned, reqDeletePinned) {
    const pinnedMessage = this.pinned.createPinnedElement(messageObj, showPinned, reqDeletePinned);
    this.updatePinnedMessage(pinnedMessage);
  }

  updatePinnedMessage(pinnedMessage) {
    if (pinnedMessage) this.messageListWrapper.append(pinnedMessage);
  }

  renderPinnedMessage(obj, listenersList) {
    this.clearMessagesList();

    this.renderMessage(this.factory.createMessage(obj, listenersList), false);
  }

  renderSearchMessage(obj, listenersList) {
    this.clearMessagesList();

    this.addMessage(obj, listenersList);
  }

  clearMessagesList() {
    this.messageBox = [];
    [...this.messageList.children].forEach((el) => el.remove());
  }

  delMessage(element) {
    element.remove();
    this.messageBox = this.messageBox.filter((m) => m !== element);

    if (this.pinned.isMessagePinned(element)) this.pinned.deletePreviewPinnedMessage();
  }

  findOldestMessage() {
    return this.messageBox[0];
  }
}
