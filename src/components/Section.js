export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(itemList) {
    itemList.forEach(item => this._renderer(item));
  }

  addItem(cardElement) {
    this._container.prepend(cardElement)
  }
}
