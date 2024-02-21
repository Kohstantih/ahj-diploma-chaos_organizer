import conversionUserCoords from './conversionUserCoords';

export default class FormUserEnterCoordsCntrl {
  constructor(form, toolTip, curtain) {
    this.form = form;
    this.toolTip = toolTip;
    this.curtain = curtain;

    this.input = this.form.coords;

    this.messageObj = null;
    this.postman = null;

    this.validatorEnterCoords = this.validatorEnterCoords.bind(this);
  }

  openForm(messageObj, postman) {
    this.messageObj = messageObj;
    this.postman = postman;

    this.curtain.showCurtain('95', 'gray');
    this.form.classList.remove('hidden');

    this.form.addEventListener('submit', this.validatorEnterCoords);
    this.input.addEventListener('input', () => {
      if (this.toolTip.isToolTip()) this.toolTip.hideAllToolTips();
    });
  }

  validatorEnterCoords(e) {
    e.preventDefault();

    const result = conversionUserCoords(this.input.value);

    if (result) {
      this.messageObj.location = result;
      this.postman.send(JSON.stringify(this.messageObj));
      this.form.reset();
      this.form.classList.add('hidden');
      this.curtain.hideCurtain();
    } else {
      const message = 'Введите координаты в виде: 51.50851, -0.12572';
      this.toolTip.showToolTip(this.input, message, 'down');
    }
  }
}
