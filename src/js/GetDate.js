export default class GetDate {
  static getDay(date) {
    let dd = date.getDate();
    if (dd.length === 1) dd = `0${dd}`;
    return dd;
  }

  static getMonth(date) {
    let mm = date.getMonth() + 1;
    if (mm.length === 1) mm = `0${mm}`;
    return mm;
  }

  static getYear(date) {
    const result = `${date.getUTCFullYear()}`;

    return result;
  }

  static getFullDate(date) {
    const dateNow = date || new Date();

    const dd = GetDate.getDay(dateNow);
    const mm = GetDate.getMonth(dateNow);
    const yy = GetDate.getYear(dateNow);
    return `${dd}.${mm}.${yy}`;
  }

  static getTime(date) {
    const dateNow = date || new Date();

    return dateNow.toTimeString().slice(0, 5);
  }

  static getFormatDate(timestamp) {
    const date = timestamp ? new Date(timestamp) : new Date();

    const result = `${GetDate.getFullDate(date)} ${GetDate.getTime(date)}`;

    return result;
  }
}
