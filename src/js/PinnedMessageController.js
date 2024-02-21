import CreationElements from './CreationElements';
import validationFileName from './validationFileName';
import validationLengthMessage from './validationLengthMessage';

export default class PinnedMessageController {
  constructor(errMessage) {
    this.errMessage = errMessage;

    this.pinnedMessage = null;

    this.imgList = {
      text: 'pinned-text',
      file: 'pinned-file',
      links: 'pinned-links',
      sticker: 'pinned-sticker',
    };

    this.filesType = ['other', 'audio', 'video', 'image'];
  }

  createPinnedElement(messageObj, showPinned, reqDeletePinned) {
    if (this.pinnedMessage) {
      this.pinnedMessage.remove();
      this.pinnedMessage = null;
    }

    const result = CreationElements.createElement('div', ['pinned_box']);
    result.dataset.id = messageObj.id;
    result.addEventListener('click', showPinned);

    const imageBox = CreationElements.createElement('div', ['pinned_img-box']);
    const image = this.createImage(messageObj);
    imageBox.append(image);
    result.append(imageBox);

    const contentBox = CreationElements.createElement('div', ['pinned_content-box']);
    const btnDelete = this.createBtnDel(reqDeletePinned);
    const content = this.createContent(messageObj);
    contentBox.append(btnDelete);
    contentBox.append(content);
    result.append(contentBox);

    this.pinnedMessage = result;

    return result;
  }

  createImage(messageObj) {
    let classImg = null;
    if (messageObj.fileStatus) classImg = this.imgList.file;
    else classImg = this.imgList[messageObj.type];

    const img = CreationElements.createElement(
      'div',
      ['pinned_image', classImg],
    );

    return img;
  }

  createBtnDel(reqDeletePinned) {
    const btn = CreationElements.createElement('button', ['btn-delete_pinned', 'hidden'], [{ name: 'type', value: 'button' }]);

    btn.addEventListener('click', this.deletePinnedMessage.bind(this, reqDeletePinned));

    return btn;
  }

  deletePinnedMessage(reqDeletePinned) {
    reqDeletePinned().then((response) => {
      if (response.ok) {
        this.deletePreviewPinnedMessage();
        return;
      }
      throw new Error('Не удалось удалить закреплённое сообщение');
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  deletePreviewPinnedMessage() {
    this.pinnedMessage.remove();
    this.pinnedMessage = null;
  }

  isMessagePinned(element) {
    if (!this.pinnedMessage) return false;
    if (element.dataset.id === this.pinnedMessage.dataset.id) return true;

    return false;
  }

  createContent(messageObj) {
    const content = CreationElements.createElement('h3', ['pinned_title']);

    if (messageObj.type === 'text' || messageObj.type === 'links') content.textContent = validationLengthMessage(messageObj.message, 40);

    if (this.filesType.find((el) => el === messageObj.type)) {
      content.textContent = validationFileName(messageObj.fileName, 35);
    }

    if (messageObj.type === 'sticker') {
      content.classList.add('pinned-content_sticker');
      content.classList.add(messageObj.message.className);
    }

    return content;
  }
}
