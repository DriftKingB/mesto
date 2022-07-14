import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this._element.querySelector('.popup__image');
    this.imageTitle = this._element.querySelector('.popup__image-title');
  }
}
