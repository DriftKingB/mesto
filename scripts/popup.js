const profilePopup = document.querySelector('.popup_type_profile-edit'),
      profilePopupForm = profilePopup.querySelector('.popup__container'),
      profilePopupInputName = profilePopup.querySelector('.popup__input_type_name'),
      profilePopupInputAbout = profilePopup.querySelector('.popup__input_type_about'),
      profilePopupCloseButton = profilePopup.querySelector('.popup__close-button');

const cardPopup = document.querySelector('.popup_type_card-add'),
      cardPopupForm = cardPopup.querySelector('.popup__container'),
      cardPopupInputTitle = cardPopup.querySelector('.popup__input_type_name'),
      cardPopupInputLink = cardPopup.querySelector('.popup__input_type_about'),
      cardPopupCloseButton = cardPopup.querySelector('.popup__close-button');

const imagePopup = document.querySelector('.popup_type_image-view'),
      imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name'),
      profileSubline = document.querySelector('.profile__subline'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileEditButton = document.querySelector('.profile__edit-button');

const albumCardTemplate = document.querySelector('#card-template').content;



function loadDefaultCards () {
  addAlbumCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
  addAlbumCard('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
  addAlbumCard('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
  addAlbumCard('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
  addAlbumCard('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
  addAlbumCard('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');
}

loadDefaultCards();



function renderProfilePopup () {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputAbout.value = profileSubline.textContent;
}

function openProfilePopup () {
  profilePopup.classList.add('popup_active');
  renderProfilePopup();
}

function closeProfilePopup () {
  profilePopup.classList.remove('popup_active');
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closeProfilePopup();
}

profileEditButton.addEventListener('click', openProfilePopup);
profilePopupCloseButton.addEventListener('click', closeProfilePopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);



function addAlbumCard (cardTitle, cardImageLink) {
  const newAlbumCard = albumCardTemplate.cloneNode(true);
  const newAlbumCardImage = newAlbumCard.querySelector('.album__image');
  const newAlbumCardTitle = newAlbumCard.querySelector('.album__title');

  newAlbumCardTitle.textContent = cardTitle;
  newAlbumCardImage.setAttribute('src', String(cardImageLink));
  newAlbumCardImage.setAttribute('alt', cardTitle);

  newAlbumCard.querySelector('.album__like-button').addEventListener('click', evt => {
    evt.target.classList.toggle('album__like-button_active');
  });
  newAlbumCard.querySelector('.album__delete-button').addEventListener('click', evt => {
    evt.target.parentNode.remove();
  });
  newAlbumCardImage.addEventListener('click', openImagePopup);

  document.querySelector('.album').prepend(newAlbumCard);
}

function renderCardPopup () {
  cardPopupInputTitle.value = '';
  cardPopupInputLink.value = '';
}

function openCardPopup () {
  cardPopup.classList.add('popup_active');
}

function closeCardPopup () {
  cardPopup.classList.remove('popup_active');
  renderCardPopup();
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addAlbumCard(cardPopupInputTitle.value, cardPopupInputLink.value);
  closeCardPopup();
}

profileAddButton.addEventListener('click', openCardPopup);
cardPopupCloseButton.addEventListener('click', closeCardPopup);
cardPopupForm.addEventListener('submit', handleCardFormSubmit);



function openImagePopup (evt) {
  const cardImageLink = evt.target.getAttribute('src');
  const cardTitle = evt.target.parentNode.parentNode.querySelector('.album__title').textContent;

  imagePopup.querySelector('.popup__image').setAttribute('src', cardImageLink);
  imagePopup.querySelector('.popup__image').setAttribute('alt', cardTitle);
  imagePopup.querySelector('.popup__image-title').textContent = cardTitle;
  imagePopup.classList.add('popup_active');
}

function closeImagePopup () {
  imagePopup.classList.remove('popup_active');
}

imagePopupCloseButton.addEventListener('click', closeImagePopup);
