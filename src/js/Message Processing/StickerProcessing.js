import GetDate from '../GetDate';

export default class StickeProcessing {
  constructor(container, postman, geolocator) {
    this.container = container;
    this.postman = postman;
    this.geolocator = geolocator;

    this.btnSticker = this.container.querySelector('.add-sticker_btn');
    this.stickerBox = this.container.querySelector('.sticker_box');

    this.stickerStatus = false;

    this.toggleVisabilitySticker = this.toggleVisabilitySticker.bind(this);
    this.addSticker = this.addSticker.bind(this);
  }

  activation() {
    this.btnSticker.addEventListener('click', this.toggleVisabilitySticker);

    this.stickerBox.addEventListener('click', this.addSticker);
  }

  toggleVisabilitySticker() {
    this.stickerBox.classList.toggle('hidden');

    this.stickerStatus = !this.stickerStatus;
  }

  addSticker(e) {
    this.createMessageObj({ className: `${e.target.dataset.sticker}` });
    this.toggleVisabilitySticker();
  }

  createMessageObj(value) {
    const obj = {
      type: 'sticker',
      message: value,
      favorites: false,
      pinned: false,
      fileStatus: false,
      date: GetDate.getFormatDate(),
    };

    this.geolocator(obj, this.postman);
  }
}
