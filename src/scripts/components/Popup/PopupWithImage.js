import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector('.popup__image');
    this._imageTitle = this._element.querySelector('.popup__image-title');
  }

  openPopup(cardTitle, cardImageLink) {
    this._image.setAttribute('src', cardImageLink);
    this._image.setAttribute('alt', cardTitle);
    this._imageTitle.textContent = cardTitle;

    super.openPopup();
  }
}
