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
  }

  readMessagesList(messagesList, listenersList, showPinned, reqDeletePinned) {
    messagesList.forEach((m) => this.addMessage(m, listenersList, showPinned, reqDeletePinned));
  }

  addMessage(obj, listenersList, showPinned, reqDeletePinned) {
    this.renderMessage(this.factory.createMessage(obj, listenersList));
    if (obj.pinned) this.adPinnedMessage(obj, showPinned, reqDeletePinned);
  }

  renderMessage(element) {
    this.lastMessage = element;
    this.messageList.append(element);
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

  renderPinnedMessage(obj, listenersList, showPinned, reqDeletePinned) {
    this.clearMessagesList();

    this.addMessage(obj, listenersList, showPinned, reqDeletePinned);
  }

  clearMessagesList() {
    [...this.messageList.children].forEach((el) => el.remove());
  }
}
