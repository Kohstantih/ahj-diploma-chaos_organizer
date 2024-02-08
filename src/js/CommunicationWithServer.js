export default class CommunicationWithServer {
  constructor(port, portWs) {
    this.port = port;
    this.portWs = portWs;

    this.ws = null;

    this.deletePinnedStatus = this.deletePinnedStatus.bind(this);
  }

  messaging(callbackOpen, callbackClose, callbackError, callbackMessage) {
    this.ws = new WebSocket(`${this.portWs}/ws`);

    this.ws.addEventListener('open', callbackOpen);

    this.ws.addEventListener('close', callbackClose);

    this.ws.addEventListener('error', callbackError);

    this.ws.addEventListener('message', callbackMessage);
  }

  async getMessagesByFilter(filter) {
    const url = `${this.port}/filters/${filter}`;

    const response = fetch(url);

    return response;
  }

  async changeFavoritesStatus(id) {
    const url = `${this.port}/favorites`;

    const response = fetch(url, {
      method: 'PUT',
      body: id,
    });

    return response;
  }

  async requestDeleteMessage(id) {
    const url = `${this.port}/message/delete/${id}`;

    const response = fetch(url, {
      method: 'DELETE',
    });

    return response;
  }

  async changePinnedStatus(id) {
    const url = `${this.port}/pinned`;

    const response = fetch(url, {
      method: 'PUT',
      body: id,
    });

    return response;
  }

  async getPinnedMessage() {
    const url = `${this.port}/pinned`;

    const response = fetch(url);

    return response;
  }

  async deletePinnedStatus() {
    const url = `${this.port}/pinned`;

    const response = fetch(url, {
      method: 'DELETE',
    });

    return response;
  }
}
