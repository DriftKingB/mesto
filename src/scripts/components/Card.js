export class Card {
  constructor({ name, link, likes = [], madeByUser, likedByUser, _id }, templateSelector, handleCardClick, handleCardRemoval, apiClass) {
    this._cardTitle = name;
    this._cardImageLink = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoval = handleCardRemoval;
    this._likesNumber = likes.length;
    this._madeByUser = madeByUser;
    this._likedByUser = likedByUser;
    this._id = _id;
    this._apiClass = apiClass;
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
    this._likesElement = this._cardElement.querySelector('.album__likes-number');
    this._loadingIcon = this._cardElement.querySelector('.album__loading-icon');

    this._cardTitleElement.textContent = this._cardTitle;
    this._cardImageElement.setAttribute('src', this._cardImageLink);
    this._cardImageElement.setAttribute('alt', this._cardTitle);
    this._likesElement.textContent = this._likesNumber;

    if (this._likedByUser) {
      this._likeButton.classList.toggle('album__like-button_active');
    }
  }

  _toggleLikes() {
    this._likesElement.classList.toggle('album__likes-number_inactive');
    this._loadingIcon.classList.toggle('album__loading-icon_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', evt => {
      if (this._likeButton.classList.contains('album__like-button_active')) {
        this._toggleLikes();
        this._apiClass.removeCardLike(this._id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then(data => {
            this._likesElement.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => { this._toggleLikes() });
      } else {
        this._toggleLikes();
        this._apiClass.putCardLike(this._id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then(data => {
            this._likesElement.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => { this._toggleLikes() });
      }

      evt.target.classList.toggle('album__like-button_active');
    });

    this._deleteButton.addEventListener('click', evt => {
      this._handleCardRemoval(evt, this._id);
    });
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardTitle, this._cardImageLink);
    });
  }

  generateCard() {
    this._addContent();
    this._setEventListeners();

    if (!this._madeByUser) {
      this._deleteButton.remove();
    }

    return this._cardElement;
  }
}


