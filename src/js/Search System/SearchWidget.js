import CreationElements from '../CreationElements';
import validationFileName from '../validationFileName';
import validationLengthMessage from '../validationLengthMessage';

export default class SearchWidget {
  constructor(container) {
    this.container = container;

    this.searchWrapper = this.container.querySelector('.options_wrapper');
    this.input = this.searchWrapper.querySelector('.options-input');
    this.searchPreview = this.searchWrapper.querySelector('.search-preview_box');
    this.previewInfo = this.searchPreview.querySelector('.search-preview_info');
    this.previewList = this.searchPreview.querySelector('.search-preview_list');

    this.previewItemsBox = [];
  }

  showPreviewBox() {
    this.searchPreview.classList.remove('hidden');
    this.changePreviewInfo('Идет поиск...');
  }

  hidePreviewBox() {
    this.searchPreview.classList.add('hidden');
    this.clearPreviewList();
    this.changePreviewInfo('');
  }

  changePreviewInfo(message) {
    this.previewInfo.textContent = message;
  }

  readSearchMessages(box, listener) {
    this.clearPreviewList();

    let message = '';
    message = box.length > 0 ? 'Результаты поиска:' : 'Ничего не найдено...';
    this.changePreviewInfo(message);
    box.forEach((el) => this.createPreviewItem(el, listener));
  }

  createPreviewItem(obj, listener) {
    const result = CreationElements.createElement('li', ['search-preview_item']);
    if (obj.fileStatus) result.textContent = validationFileName(obj.fileName, 30);
    else result.textContent = validationLengthMessage(obj.message, 30);
    result.dataset.id = obj.id;

    result.addEventListener('click', listener);

    this.previewItemsBox.push(result);

    this.previewList.append(result);
  }

  clearPreviewList() {
    this.previewItemsBox.forEach((el) => el.remove());

    this.previewItemsBox = [];
  }
}
