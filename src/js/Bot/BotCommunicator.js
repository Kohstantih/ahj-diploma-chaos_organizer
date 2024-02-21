export default class BotCommunicator {
  constructor(port) {
    this.port = port;
  }

  getInfo(code) {
    const url = `${this.port}/bot/${code}`;

    const response = fetch(url);

    return response;
  }
}
