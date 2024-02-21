import CreationElements from '../CreationElements';
import GetDate from '../GetDate';

export default class BotWidget {
  constructor(container) {
    this.container = container;

    this.header = this.container.querySelector('.organizer_header');
    this.btnBotCntl = this.header.querySelector('.bot-control_btn');
    this.botInputBox = this.header.querySelector('.options-bot_box');
    this.searchInputBox = this.header.querySelector('.options-input_box');
    this.input = this.botInputBox.querySelector('.bot-input');
    this.botInformBox = this.header.querySelector('.bot-info_container');
    this.contentBox = this.header.querySelector('.bot-info_content');

    this.botInfoIcon = this.botInformBox.querySelector('.bot-info_icon');

    this.contentStatus = false;
    this.lastIconClass = null;

    this.getFormatDate = GetDate.getFormatDate;

    this.createWheatherContent = this.createWheatherContent.bind(this);
    this.createCurrencyContent = this.createCurrencyContent.bind(this);
    this.createNewsContent = this.createNewsContent.bind(this);
    this.createPosterContent = this.createPosterContent.bind(this);
    this.createImageContent = this.createImageContent.bind(this);

    this.listCreators = {
      wheather: this.createWheatherContent,
      currency: this.createCurrencyContent,
      news: this.createNewsContent,
      poster: this.createPosterContent,
      image: this.createImageContent,
    };

    this.wheatherIconsList = {
      0: 'snowing-img',
      1: 'cloud-img',
      2: 'rain-img',
      3: 'sun-img',
    };

    this.iconsClassList = {
      wheather: 'wheather',
      currency: 'currency',
      news: 'news',
      poster: 'poster',
      image: 'image_bot',
    };

    this.currencySymbolDefault = '&#9884;';
  }

  showBotInform(data) {
    this.listCreators[data.code](data);
    this.addIcon(this.iconsClassList[data.code]);
    this.botInformBox.classList.remove('hidden');
  }

  hideBotInform() {
    this.contentBox.innerHTML = '';
    this.contentStatus = false;
    if (this.lastIconClass) {
      this.botInfoIcon.classList.remove(this.lastIconClass);
      this.lastIconClass = null;
    }
    this.botInformBox.classList.add('hidden');
    this.input.value = '';
  }

  addIcon(className) {
    if (this.lastIconClass) this.botInfoIcon.classList.remove(this.lastIconClass);
    this.botInfoIcon.classList.add(className);
    this.lastIconClass = className;
  }

  createWheatherContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const obj = data.inform[0];

    const header = CreationElements.createElement('div', ['wheather_header']);

    this.contentBox.append(header);
    const tempValue = CreationElements.createElement('span', ['temp_value']);
    tempValue.textContent = obj.degree;
    header.append(tempValue);

    const wrapperTempUnits = CreationElements.createElement('div', ['wrapper_temp-unit']);
    const degree = CreationElements.createElement('span', ['degree']);
    const unit = CreationElements.createElement('span', ['unit']);
    unit.textContent = 'C';
    wrapperTempUnits.append(degree);
    wrapperTempUnits.append(unit);
    header.append(wrapperTempUnits);

    const wheatherIcon = CreationElements.createElement('div', ['wheather_img']);
    const numberICon = BotWidget.analysisTemp(obj.degree);
    wheatherIcon.classList.add(this.wheatherIconsList[numberICon]);
    header.append(wheatherIcon);

    const infoList = CreationElements.createElement('ul', ['wheather-info_list']);
    const windItem = CreationElements.createElement('li', ['wheather-info_item']);
    windItem.innerHTML = `<span class="wind">Ветер: <span class="wind_value">${obj.windSpeed}</span> м/с</span>`;
    const humidityItem = CreationElements.createElement('li', ['wheather-info_item']);
    humidityItem.innerHTML = `<span class="humidity">Влажность: <span class="humidity_value">${obj.humidityPercents}</span>%</span>`;
    const rainItem = CreationElements.createElement('li', ['wheather-info_item']);
    rainItem.innerHTML = `<span class="rain">Осадки: <span class="rain_value">${obj.rainPercents}</span>%</span>`;
    infoList.append(windItem);
    infoList.append(humidityItem);
    infoList.append(rainItem);

    this.contentBox.append(infoList);
    this.contentStatus = true;
  }

  static analysisTemp(degree) {
    if (degree <= 0) return 0;
    if (degree > 0 && degree < 10) return 1;
    if (degree > 10 && degree < 20) return 2;
    return 3;
  }

  createCurrencyContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const currencyObjBox = data.inform;

    const date = GetDate.getFormatDate(data.timestamp);
    this.contentBox.innerHTML = `<h4 class="title_currency">Курсы валют на: <br><span class="currency_date">${date}</span></h4>`;
    const currencyList = CreationElements.createElement('ul', ['currency_list']);
    currencyList.append(this.createCurrencyItem({
      symbol: ' ', code: ' ', currencyBuy: 'купить', currencySelling: 'сдать',
    }));
    currencyObjBox.forEach((el) => currencyList.append(this.createCurrencyItem(el)));
    this.contentBox.append(currencyList);

    this.contentStatus = true;
  }

  createCurrencyItem(obj) {
    const item = CreationElements.createElement('li', ['currency_item']);

    const symbol = obj.symbol && obj.symbol.length < 2 ? obj.symbol : this.currencySymbolDefault;

    item.innerHTML = `<span class="currency_symbol item-point">${symbol}</span>`;
    item.innerHTML += `<span class="currency_code item-point">${obj.code}</span>`;
    item.innerHTML += `<span class="rate item-point">
                        <span class="currency_buy currency_count">${obj.currencyBuy}</span> 
                        / <span class="currency_selling currency_count">${obj.currencySelling}</span>
                      </span>`;

    return item;
  }

  createNewsContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const newsObjBox = data.inform;

    this.contentBox.innerHTML = '<h4 class="title_news">Последние новости</h4>';
    const newsList = CreationElements.createElement('ul', ['news_list']);

    newsObjBox.forEach((el) => newsList.append(this.createNewsItem(el)));
    this.contentBox.append(newsList);

    this.contentStatus = true;
  }

  createNewsItem(obj) {
    const item = CreationElements.createElement('li', ['news_item']);
    item.textContent = obj.text;
    item.innerHTML += `<br><span class="news_date">${this.getFormatDate(obj.timestamp)}</span>`;
    return item;
  }

  createPosterContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const posterObjBox = data.inform;

    const posterList = CreationElements.createElement('ul', ['posters_list']);

    posterObjBox.forEach((el) => posterList.append(this.createPosterItem(el)));
    this.contentBox.append(posterList);

    this.contentStatus = true;
  }

  createPosterItem(obj) {
    const item = CreationElements.createElement('li', ['posters_item']);
    const posterHeader = CreationElements.createElement('div', ['poster_header']);
    item.append(posterHeader);

    const img = CreationElements.createElement('img', ['poster_img'], [
      { name: 'src', value: `${obj.src}` },
      { name: 'alt', value: 'Иллюстрация афишы' },
    ]);
    posterHeader.append(img);
    const title = CreationElements.createElement('h4', ['poster_title']);
    title.textContent = obj.name;
    posterHeader.append(title);
    const posterDescription = CreationElements.createElement('div', ['poster_description']);
    const cinema = obj.cinema.slice(0, 1).toUpperCase() + obj.cinema.slice(1);
    posterDescription.innerHTML = `<p class="poster-description_item">Где: 
                                    <span class="cinema_name poster-description_value">${cinema}</span>
                                  </p>`;
    const date = this.getFormatDate(obj.timestamp);

    posterDescription.innerHTML += `<p class="poster-description_item">Дата:
                                      <span class="poster_date poster-description_value">${date.slice(0, -6)}</span>
                                    </p>`;
    posterDescription.innerHTML += `<p class="poster-description_item">Время:
                                      <span class="poster_time poster-description_value">${date.slice(-5)}</span>
                                    </p>`;

    item.append(posterDescription);

    return item;
  }

  createImageContent(data) {
    if (this.contentStatus) this.contentBox.innerHTML = '';
    const obj = data.inform[0];

    const title = CreationElements.createElement('h4', ['bots-image_title']);
    title.textContent = obj.name;
    this.contentBox.append(title);

    const imgPreview = CreationElements.createElement(
      'img',
      ['bots_image'],
      [
        { name: 'src', value: obj.src },
        { name: 'alt', value: 'Изображение предоставленное ботом' },
      ],
    );

    this.contentBox.append(imgPreview);
    this.contentStatus = true;
  }
}
