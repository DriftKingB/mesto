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

const popupList = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__name'),
      profileSubline = document.querySelector('.profile__subline'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileEditButton = document.querySelector('.profile__edit-button');

const album = document.querySelector('.album'),
      albumCardTemplate = document.querySelector('#card-template').content;

const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
};




function loadDefaultCards (cardObject) {
  for (const [key, value] of Object.entries(cardObject)) {
    addAlbumCard(key, value);
  }
}

loadDefaultCards(defaultCards);



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
    evt.target.closest('.album__card').remove();
  });
  newAlbumCardImage.addEventListener('click', () => {
    displayImagePopup(cardTitle, cardImageLink);
  });

  return newAlbumCard
}





function openPopup (popup) {
  popup.classList.add('popup_active');

  document.addEventListener('keydown', closeByEscape);
}

function closePopup (popup) {
  popup.classList.remove('popup_active');

  document.removeEventListener('keydown', closeByEscape);
}

function resetValidation (popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  const buttonElement = popup.querySelector(settings.submitButtonSelector);

  inputList.forEach(input => {
    hideInputError(popup, input, settings);
  })
  toggleButtonState(inputList, buttonElement, settings);
}

function renderProflePopup () {
  resetValidation(profilePopup);
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputAbout.value = profileSubline.textContent;
}

function displayProfilePopup () {
  renderProflePopup();
  openPopup(profilePopup);
}

function renderCardPopup () {
  cardPopupForm.reset();
  resetValidation(cardPopup);
}

function displayCardPopup () {
  renderCardPopup();
  openPopup(cardPopup);
}

function renderImagePopup (cardTitle, cardImageLink) {
  imagePopupContent.setAttribute('src', cardImageLink);
  imagePopupContent.setAttribute('alt', cardTitle);
  imagePopupContentTitle.textContent = cardTitle;
}

function displayImagePopup (cardTitle, cardImageLink) {
  renderImagePopup(cardTitle, cardImageLink);
  openPopup(imagePopup);
}







function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closePopup(profilePopup);
}

profileEditButton.addEventListener('click', displayProfilePopup);
profilePopupForm.addEventListener('submit', handleProfileFormSubmit);


function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addAlbumCard(cardPopupInputTitle.value, cardPopupInputLink.value);
  closePopup(cardPopup);
}

profileAddButton.addEventListener('click', displayCardPopup);
cardPopupForm.addEventListener('submit', handleCardFormSubmit);


popupList.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_active')) {
      closePopup(popup);
    } else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}


