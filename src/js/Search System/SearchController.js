import {
  debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap,
} from 'rxjs';

export default class SearchController {
  constructor(widget, communicator, errMessage, port) {
    this.widget = widget;
    this.communicator = communicator;
    this.errMessage = errMessage;
    this.port = port;

    this.renderMessage = null;
    this.stream$ = null;
    this.observer = {
      next: (data) => {
        this.widget.readSearchMessages(data, this.showSearchedMessage);
      },
      error: (err) => this.errMessage.showMessage(err.message),
      complete: () => {
        this.widget.hidePreviewBox();
        this.searchStatus = false;
        this.widget.input.value = '';
      },
    };

    this.searchStatus = false;

    this.showSearchedMessage = this.showSearchedMessage.bind(this);
  }

  activation(renderMessage) {
    this.renderMessage = renderMessage;

    this.stream$ = fromEvent(this.widget.input, 'input')
      .pipe(
        debounceTime(500),
        map((event) => event.target.value.trim()),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap((value) => {
          this.widget.showPreviewBox();
          this.searchStatus = true;

          return fetch(`${this.port}/search/${value}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error('Не удалось осуществить поиск');
            });
        }),
      );

    this.subscribeStream();

    this.widget.input.addEventListener('input', (e) => {
      if (!this.searchStatus) this.subscribeStream();

      if (!this.searchStatus) this.searchStatus = true;

      if (e.target.value === '') this.widget.changePreviewInfo('Продолжим поиск?');
      else this.widget.changePreviewInfo('Идёт поиск...');
    });
  }

  subscribeStream() {
    this.stream$.subscribe(this.observer);
  }

  stopStream() {
    this.observer.complete();
  }

  showSearchedMessage(e) {
    this.stopStream();

    this.communicator.getMessageById(e.target.dataset.id).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить искомое сообщение');
    }).then((data) => {
      if (data) {
        this.renderMessage(data);
        return;
      }
      throw new Error('Не удалось обработать ответ сервера');
    }).catch((err) => {
      this.errMessage.showMessage(err.message);
    });
  }
}
