import GetDate from '../GetDate';

export default class TextInputProcessing {
  constructor(input, emojiBtn, emojiBox, postman, geolocator, toolTip) {
    this.input = input;
    this.btn = emojiBtn;
    this.emojiBox = emojiBox;
    this.postman = postman;
    this.geolocator = geolocator;
    this.toolTip = toolTip;

    this.emojiStatus = false;

    this.toggleVisabilityEmoji = this.toggleVisabilityEmoji.bind(this);
  }

  activation() {
    this.btn.addEventListener('click', this.toggleVisabilityEmoji);

    [...this.emojiBox.children].forEach((emoji) => {
      emoji.addEventListener('click', (e) => {
        this.input.value += e.target.innerText;
      });
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) this.validation(e.target.value);
    });

    this.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }

  toggleVisabilityEmoji() {
    this.emojiBox.classList.toggle('hidden');
    this.emojiStatus = !this.emojiStatus;
  }

  validation(value) {
    if (value) {
      this.createMessageObj(value);
      this.input.value = '';
    } else {
      const message = 'Невозможно отправить пустое сообщение';
      this.toolTip.showToolTip(this.input, message);
    }
  }

  createMessageObj(value) {
    const obj = {
      type: 'text',
      message: value,
      favorites: false,
      pinned: false,
      date: GetDate.getFormatDate(),
    };

    this.geolocator(obj, this.postman);
  }
}
