export default class Geolocation {
  constructor(formController, informWidget) {
    this.formController = formController;
    this.informWidget = informWidget;

    this.messageObj = null;
    this.postman = null;

    this.getCoordinates = this.getCoordinates.bind(this);
    this.sendNavigatorCoords = this.sendNavigatorCoords.bind(this);
    this.sendUserCoords = this.sendUserCoords.bind(this);
  }

  getCoordinates(messageObj, postman) {
    this.messageObj = messageObj;
    this.postman = postman;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.sendNavigatorCoords,
        this.sendUserCoords,
        { enableHighAccuracy: true },
      );
    } else {
      this.informWidget.showMessage('Используйте другой браузер, определение геолокации недоступно');
    }
  }

  sendNavigatorCoords(data) {
    const { latitude, longitude } = data.coords;
    this.messageObj.location = `[${latitude}, ${longitude}]`;

    this.postman.send(JSON.stringify(this.messageObj));
  }

  sendUserCoords() {
    this.formController.openForm(this.messageObj, this.postman);
  }
}
