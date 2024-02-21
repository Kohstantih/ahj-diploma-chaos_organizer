export default class MultimediaWidget {
  constructor(container) {
    this.container = container;

    this.boxForHide = this.container.querySelector('.wrapper_standart-footer');
    this.recBox = this.container.querySelector('.footer_rec-active');
    this.btnRecAudio = this.boxForHide.querySelector('.rec-btn_audio');
    this.btnRecVideo = this.boxForHide.querySelector('.rec-btn_video');
    this.btnStopRec = this.recBox.querySelector('.btn_end');
    this.btnCanselRec = this.recBox.querySelector('.btn_cansel');
    this.counterWidget = this.recBox.querySelector('.timer_rec');
    this.previewBox = this.container.querySelector('.preview_box');
    this.preview = this.previewBox.querySelector('.preview');

    this.previewStatus = false;
  }

  toggleVissability() {
    this.boxForHide.classList.toggle('hidden');
    this.recBox.classList.toggle('hidden');
  }

  showPreview(stream, errmessage) {
    if ('srcObject' in this.preview) {
      try {
        this.previewStatus = true;
        this.previewBox.classList.remove('hidden');
        this.preview.srcObject = stream;
        this.preview.addEventListener('canplay', (e) => {
          e.preventDefault();
          this.preview.play();
        });
      } catch (err) {
        errmessage.showMessage(err.message);
      }
    }
  }

  hidePreview() {
    if (this.previewStatus) {
      this.previewBox.classList.add('hidden');
      this.preview.srcOject = null;
      this.previewStatus = false;
    }
  }
}
