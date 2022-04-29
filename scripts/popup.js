const profilePopup = document.querySelector('.popup_type_profile-edit'),
      profilePopupForm = profilePopup.querySelector('.popup__container'),
      profilePopupInputName = profilePopup.querySelector('.popup__input_type_name'),
      profilePopupInputAbout = profilePopup.querySelector('.popup__input_type_about');

const cardPopup = document.querySelector('.popup_type_card-add'),
      cardPopupForm = cardPopup.querySelector('.popup__container'),
      cardPopupInputTitle = cardPopup.querySelector('.popup__input_type_name'),
      cardPopupInputLink = cardPopup.querySelector('.popup__input_type_about');

const imagePopup = document.querySelector('.popup_type_image-view'),
      imagePopupContent = imagePopup.querySelector('.popup__image'),
      imagePopupContentTitle = imagePopup.querySelector('.popup__image-title');

const profileName = document.querySelector('.profile__name'),
      profileSubline = document.querySelector('.profile__subline'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileEditButton = document.querySelector('.profile__edit-button');

const album = document.querySelector('.album'),
      albumCardTemplate = document.querySelector('#card-template').content;

const popupCloseButtons = document.querySelectorAll('.popup__close-button');



function loadDefaultCards () {
  addAlbumCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
  addAlbumCard('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
  addAlbumCard('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
  addAlbumCard('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
  addAlbumCard('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
  addAlbumCard('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');
}

loadDefaultCards();



function addAlbumCard (cardTitle, cardImageLink) {
  const newAlbumCard = createAlbumCard(cardTitle, cardImageLink);
  album.prepend(newAlbumCard);
}

function createAlbumCard (cardTitle, cardImageLink) {
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
  newAlbumCardImage.addEventListener('click', openPopup);

  return newAlbumCard
}




function renderPopup (evt) {
  if (Array.from(evt.target.classList).includes('profile__edit-button')) {

    profilePopupInputName.value = profileName.textContent;
    profilePopupInputAbout.value = profileSubline.textContent;

  } else if (Array.from(evt.target.classList).includes('profile__add-button')) {

    cardPopupForm.reset();

  } else if (Array.from(evt.target.classList).includes('album__image')) {

    const cardImageLink = evt.target.getAttribute('src');
    const cardTitle = evt.target.parentNode.parentNode.querySelector('.album__title').textContent;

    imagePopupContent.setAttribute('src', cardImageLink);
    imagePopupContent.setAttribute('alt', cardTitle);
    imagePopupContentTitle.textContent = cardTitle;
  }
}

function openPopup (evt) {
  renderPopup(evt);

  if (Array.from(evt.target.classList).includes('profile__edit-button')) {

    profilePopup.classList.add('popup_active');

  } else if (Array.from(evt.target.classList).includes('profile__add-button')) {

    cardPopup.classList.add('popup_active');

  } else if (Array.from(evt.target.classList).includes('album__image')) {

    imagePopup.classList.add('popup_active');

  }
}

function closePopup (evt) {
  if (Array.from(evt.target.classList).includes('popup__close-button')) {

    evt.target.parentNode.parentNode.classList.remove('popup_active');

  } else if (Array.from(evt.target.classList).includes('popup__container')) {

    evt.target.parentNode.classList.remove('popup_active');

  }
}




function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closePopup(evt);
}

profileEditButton.addEventListener('click', openPopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);


function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addAlbumCard(cardPopupInputTitle.value, cardPopupInputLink.value);
  closePopup(evt);
}

profileAddButton.addEventListener('click', openPopup);
cardPopupForm.addEventListener('submit', handleCardFormSubmit);

popupCloseButtons.forEach(button => {
  button.addEventListener('click', closePopup);
})

