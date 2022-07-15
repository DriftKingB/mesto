export class Section {
  constructor({ defaultItems, renderer }, containerSelector) {
    this.defaultItemList = defaultItems;
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
