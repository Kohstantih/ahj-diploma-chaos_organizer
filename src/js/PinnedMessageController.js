import CreationElements from './CreationElements';

export default class PinnedMessageController {
  constructor(errMessage) {
    this.errMessage = errMessage;

    this.pinnedMessage = null;

    this.imgList = {
      text: './img/text.png',
    };
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
    const src = this.imgList[messageObj.type];

    const img = CreationElements.createElement(
      'img',
      ['pinned_image'],
      [
        {
          name: 'src',
          value: src,
        },
        {
          name: 'alt',
          value: 'Изображение закрепленного сообщения',
        },
      ],
    );

    return img;
  }

  createBtnDel(reqDeletePinned) {
    const btn = CreationElements.createElement('button', ['btn-delete_pinned', 'hidden'], [{ name: 'type', value: 'button' }]);

    btn.addEventListener('click', this.deletePinnedMessage.bind(this, reqDeletePinned));

    return btn;
  }

  deletePinnedMessage(reqDeletePinned, e) {
    const pinnedMessage = e.target.closest('.pinned_box');

    reqDeletePinned().then((response) => {
      if (response.ok) {
        pinnedMessage.remove();
        return;
      }
      throw new Error('Не удалось удалить закреплённое сообщение');
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  createContent(messageObj) {
    const content = CreationElements.createElement('h3', ['pinned_title']);

    if (messageObj.type === 'text') content.textContent = PinnedMessageController.validationContent(messageObj.message);

    return content;
  }

  static validationContent(string) {
    if (string.length < 15) {
      return string;
    }
    const result = `${string.slice(0, 15)}...`;
    return result;
  }
}
