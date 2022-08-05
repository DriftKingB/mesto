export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._containerSelector = containerSelector;
  }

  renderItems(itemList) {
    itemList.forEach(this._renderer);
  }

  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
