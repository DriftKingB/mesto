export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItem(item) {
    const cardElement = this._renderer(item);

    return cardElement
  }

  addItems(itemList) {
    itemList.forEach(item => {
      const cardElement = this.renderItem(item);

      this._container.prepend(cardElement);
    });
  }
}
