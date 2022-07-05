import { openPopup } from "./index.js";

export class Card {
  constructor(cardTitle, cardImageLink, templateSelector) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._templateSelector = templateSelector;
    this._imagePopupElement = document.querySelector('.popup_type_image-view');
  }

  _getTemplate() {
    const newAlbumCard = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return newAlbumCard
  }

  _addContent() {
    this._element = this._getTemplate();
    const newAlbumCardImage = this._element.querySelector('.album__image');
    const newAlbumCardTitle = this._element.querySelector('.album__title');

    newAlbumCardTitle.textContent = this._cardTitle;
    newAlbumCardImage.setAttribute('src', String(this._cardImageLink));
    newAlbumCardImage.setAttribute('alt', this._cardTitle);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.album__like-button');
    const deleteButton = this._element.querySelector('.album__delete-button');
    const newAlbumCardImage = this._element.querySelector('.album__image');

    likeButton.addEventListener('click', evt => {
      evt.target.classList.toggle('album__like-button_active');
    });
    deleteButton.addEventListener('click', evt => {
      evt.target.closest('.album__card').remove();
    });
    newAlbumCardImage.addEventListener('click', () => {
      this._displayImagePopup();
    });
  }

  generateCard() {
    this._addContent();
    this._setEventListeners();

    return this._element;
  }

  _renderImagePopup () {
    const imagePopupContent = this._imagePopupElement.querySelector('.popup__image');
    const imagePopupContentTitle = this._imagePopupElement.querySelector('.popup__image-title');

    imagePopupContent.setAttribute('src', this._cardImageLink);
    imagePopupContent.setAttribute('alt', this._cardTitle);
    imagePopupContentTitle.textContent = this._cardTitle;
  }

  _displayImagePopup () {
    this._renderImagePopup();
    openPopup(this._imagePopupElement);
  }
}


