import CounterTime from '../../Auxiliary Tools/CounterTime';
import GetDate from '../../GetDate';

export default class MultimediaInputProcessing {
  constructor(widget, communicator, geolocator, errMessage, showInform) {
    this.widget = widget;
    this.communicator = communicator;
    this.geolocator = geolocator;
    this.errMessage = errMessage;
    this.showInform = showInform;

    this.counter = null;

    this.stream = null;
    this.recorder = null;
    this.chunks = null;
    this.canselStatus = true;

    this.recAudio = this.recAudio.bind(this);
    this.recVideo = this.recVideo.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.canselRecord = this.canselRecord.bind(this);
  }

  activation() {
    this.counter = new CounterTime(this.widget.counterWidget);

    this.widget.btnRecAudio.addEventListener('click', this.recAudio);
    this.widget.btnRecVideo.addEventListener('click', this.recVideo);
    this.widget.btnStopRec.addEventListener('click', this.stopRecord);
    this.widget.btnCanselRec.addEventListener('click', this.canselRecord);
  }

  recAudio() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.stream = stream;
          this.recorder = new MediaRecorder(stream);

          this.recorder.addEventListener('start', () => {
            this.chunks = [];
            this.widget.toggleVissability();
            this.counter.startCounter();
          });

          this.recorder.addEventListener('dataavailable', (event) => {
            this.chunks.push(event.data);
          });

          this.recorder.addEventListener('stop', () => {
            if (this.canselStatus) {
              const blob = new Blob(this.chunks);

              const file = new File(
                [blob],
                `${GetDate.getFormatDate()}.webm`,
                {
                  type: 'audio/webm',
                  lastModified: Date.now(),
                },
              );
              const type = 'audio';
              this.sendFile(file, type);
            }

            this.widget.toggleVissability();
            this.chunks = null;
            this.canselStatus = true;
            this.counter.stopCounter();
          });

          this.recorder.start();
        })
        .catch(() => {
          this.showInform.showMessage('Предоставьте доступ к микрофону');
        });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к микрофону');
    }
  }

  recVideo() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true }).then((stream) => {
          this.stream = stream;
          this.recorder = new MediaRecorder(stream);

          this.recorder.addEventListener('start', () => {
            this.chunks = [];
            this.widget.toggleVissability();
            this.widget.showPreview(stream);
            this.counter.startCounter();
          });

          this.recorder.addEventListener('dataavailable', (event) => {
            this.chunks.push(event.data);
          });

          this.recorder.addEventListener('stop', () => {
            if (this.canselStatus) {
              const blob = new Blob(this.chunks);

              const file = new File(
                [blob],
                `${GetDate.getFormatDate()}.webm`,
                {
                  type: 'video/webm',
                  lastModified: Date.now(),
                },
              );
              const type = 'video';
              this.sendFile(file, type);
            }

            this.widget.toggleVissability();
            this.widget.hidePreview();
            this.chunks = null;
            this.canselStatus = true;
            this.counter.stopCounter();
          });

          this.recorder.start();
        }).catch(() => {
          this.showInform.showMessage('Предоставьте доступ к камере и  микрофону');
        });
    } else {
      this.showInform.showMessage('Используйте другой браузер, невозможно получить доступ к камере');
    }
  }

  stopRecord() {
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.recorder = null;
    this.stream = null;
  }

  canselRecord() {
    this.canselStatus = false;
    this.stopRecord();
  }

  createAudioObj(src) {
    const result = { src };
    const type = 'audio';

    this.createMessageObj(result, type);
  }

  sendFile(file, type) {
    const formData = new FormData();
    formData.append('file', file);

    this.communicator.sendFile(formData).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отправить видео');
    }).then((data) => {
      const { link, fileName } = data;
      const objMessage = {
        link,
      };
      this.createMessageObj(objMessage, type, fileName);
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }

  createMessageObj(objMessage, type, fileName) {
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
