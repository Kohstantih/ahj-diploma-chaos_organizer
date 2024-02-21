export default class SearchCommunicationServer {
  constructor(port) {
    this.port = port;
  }

  getMessageById(id) {
    const url = `${this.port}/message/search/${id}`;

    const response = fetch(url);

    return response;
  }
}
