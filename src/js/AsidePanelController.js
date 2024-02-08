export default class AsidePanelController {
  constructor(asidePanel, asideBtn, filtrator) {
    this.panel = asidePanel;
    this.btn = asideBtn;
    this.filtrator = filtrator;

    this.panelItems = this.panel.querySelectorAll('.menu_item');
    this.counters = this.createCountersObj();

    this.markActive = false;
    this.activeFilter = null;

    this.activatorFilter = this.activatorFilter.bind(this);

    this.updateCountAll = this.updateCountAll.bind(this);
  }

  createCountersObj() {
    const arrCounters = [...this.panel.querySelectorAll('.item_counter')];
    const result = {};

    for (let i = 0; i < arrCounters.length; i += 1) {
      result[arrCounters[i].dataset.id] = arrCounters[i];
    }

    return result;
  }

  activation() {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();

      this.markActive = !this.markActive;

      if (this.markActive) this.addListeners();
      else this.removeListeners();

      this.btn.classList.toggle('aside-active');
      this.panel.classList.toggle('hidden');
    });
  }

  addListeners() {
    this.panelItems.forEach((item) => item.addEventListener('click', this.activatorFilter));
  }

  removeListeners() {
    this.panelItems.forEach((item) => item.removeEventListener('click', this.activatorFilter));
  }

  activatorFilter(e) {
    if ((!this.activeFilter && e.currentTarget === 'all') || (this.activeFilter && e.currentTarget.id === this.activeFilter.id)) return;

    if (this.activeFilter) this.activeFilter.removeAttribute('style');

    this.activeFilter = e.currentTarget;
    this.activeFilter.style.color = 'blue';

    this.filtrator(this.activeFilter.id);
  }

  updateCount(filter, value) {
    this.counters[filter].textContent = value;
  }

  updateCountAll(countList) {
    countList.forEach((c) => this.updateCount(c.filter, c.count));
  }
}
