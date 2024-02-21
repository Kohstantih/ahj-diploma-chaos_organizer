import GetDate from '../GetDate';
import fileTypeDetection from './fileTypeDetection';

export default class FileInputProcessing {
  constructor(container, communicator, geolocator, errMessage) {
    this.container = container;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;

    this.organaizerBox = this.container.querySelector('.organizer-box');
    this.loader = document.forms.loader;
    this.inputFile = this.organaizerBox.querySelector('.file-loader');
    this.trap = this.organaizerBox.querySelector('.message-list_wrapper');
    this.btnUpload = this.organaizerBox.querySelector('.load-file_btn');

    this.toggleActiveTrap = this.toggleActiveTrap.bind(this);
    this.clickLoad = this.clickLoad.bind(this);
  }

  activation() {
    this.organaizerBox.addEventListener('click', (e) => {
      if (e.target === this.btnUpload) this.inputFile.dispatchEvent(new MouseEvent('click'));
    });

    this.inputFile.addEventListener('input', this.clickLoad);

    this.trap.addEventListener('dragenter', this.toggleActiveTrap);
    this.trap.addEventListener('dragleave', this.toggleActiveTrap);

    this.trap.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    this.trap.addEventListener('drop', (e) => {
      e.preventDefault();

      this.toggleActiveTrap();

      const file = e.dataTransfer.files && e.dataTransfer.files[0];

      if (file) this.sendFile(file);
    });
  }

  toggleActiveTrap() {
    this.trap.classList.toggle('active_drag-n-drop');
  }

  clickLoad() {
    const file = this.inputFile.files && this.inputFile.files[0];

    if (file) this.sendFile(file);
  }

  sendFile(file) {
    const fileType = file.type;

    const formData = new FormData();
    formData.append('file', file);

    this.communicator.sendFile(formData).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отправить файл');
    }).then((data) => {
      const type = fileTypeDetection(fileType);
      const { link, fileName } = data;
      const objMessage = {
        link,
        fileName,
      };
      this.createFileObj(objMessage, type, fileName);
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });

    this.inputFile.value = '';
  }

  createFileObj(objMessage, type, fileName) {
    const obj = {
      type,
      message: objMessage,
      favorites: false,
      pinned: false,
      fileStatus: true,
      fileName,
      date: GetDate.getFormatDate(),
    };

    this.geolocator.getCoordinates(obj, this.communicator.ws);
  }
}
