export class Card {
  constructor(cardTitle, cardImageLink, templateSelector, handleCardClick) {
    this._cardTitle = cardTitle;
    this._cardImageLink = cardImageLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newAlbumCard = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return newAlbumCard
  }

  _addContent() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.album__image');
    this._cardTitleElement = this._cardElement.querySelector('.album__title');
    this._likeButton = this._cardElement.querySelector('.album__like-button');
    this._deleteButton = this._cardElement.querySelector('.album__delete-button');

    this._cardTitleElement.textContent = this._cardTitle;
    this._cardImageElement.setAttribute('src', this._cardImageLink);
    this._cardImageElement.setAttribute('alt', this._cardTitle);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', evt => {
      evt.target.classList.toggle('album__like-button_active');
    });
    this._deleteButton.addEventListener('click', evt => {
      evt.target.closest('.album__card').remove();
    });
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardTitle, this._cardImageLink);
    });
  }

  generateCard() {
    this._addContent();
    this._setEventListeners();

    return this._cardElement;
  }
}


