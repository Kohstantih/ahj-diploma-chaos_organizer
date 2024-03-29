export default class ToolTip {
  constructor() {
    this.toolTipsBox = [];
    this.clessesList = {
      up: 'tooltip-up',
      down: 'tooltip-down',
    };
  }

  showToolTip(element, message, position) {
    const toolTip = document.createElement('div');
    toolTip.classList.add('tooltip', this.clessesList[position]);
    toolTip.textContent = message;
    toolTip.dataset.name = element.name;
    this.toolTipsBox.push(toolTip);

    document.body.append(toolTip);

    const { top, bottom, left } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;

    toolTip.style.left = `${left - offsetHorizont}px`;
    if (position === 'down') toolTip.style.top = `${bottom + 5}px`;
    if (position === 'up') toolTip.style.top = `${top - toolTip.offsetHeight - 10}px`;
  }

  hideAllToolTips() {
    for (let i = 0; i < this.toolTipsBox.length; i += 1) {
      this.toolTipsBox[i].remove();
    }
    this.toolTipsBox = [];
  }

  hideToolTip(name) {
    const hideToolTip = this.toolTipsBox.find((t) => t.dataset.name === name);
    hideToolTip.remove();
    this.toolTipsBox = this.toolTipsBox.filter((t) => t !== hideToolTip);
  }

  isToolTip() {
    if (this.toolTipsBox.length !== 0) return true;
    return false;
  }
}
