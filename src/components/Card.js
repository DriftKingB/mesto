export class Card {
  constructor({ name, link, likes = [], owner, _id }, handlers, templateSelector, userId) {
    this.cardTitle = name;
    this.cardImageLink = link;
    this._likes = likes;
    this.id = _id;
    this._handleCardClick = handlers.click;
    this._handleCardRemoval = handlers.remove;
    this._handleCardLike = handlers.like;
    this._templateSelector = templateSelector;
    this._madeByUser = (owner._id === userId) ? true : false;
    this._userId = userId;
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
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this.cardTitleElement = this._cardElement.querySelector('.card__title');
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._likesElement = this._cardElement.querySelector('.card__likes-number');
    this._loadingIcon = this._cardElement.querySelector('.card__loading-icon');

    this.cardTitleElement.textContent = this.cardTitle;
    this._cardImageElement.setAttribute('src', this.cardImageLink);
    this._cardImageElement.setAttribute('alt', this.cardTitle);
    this.setLikes(this._likes);

    if (!this._madeByUser) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this);
    });

    this._deleteButton.addEventListener('click', evt => {
      this._handleCardRemoval(this, evt);
    });
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this);
    });
  }

  _toggleLikeState(likedByUser) {
    if (likedByUser) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  setLikes(likesList) {
    this.likedByUser = (likesList.some(user => user._id === this._userId)) ? true : false;
    this._likes = likesList;
    this._likesElement.textContent = likesList.length;
    this._toggleLikeState(this.likedByUser);
  }

  toggleLikesLoad() {
    this._likesElement.classList.toggle('card__likes-number_inactive');
    this._loadingIcon.classList.toggle('card__loading-icon_active');
  }

  generateCard() {
    this._addContent();
    this._setEventListeners();
    this._toggleLikeState(this.likedByUser);

    return this._cardElement;
  }

  removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }
}
