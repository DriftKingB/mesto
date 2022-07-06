import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

const defaultCards = {
  'cardName1': {
    'title': 'Архыз',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    'cardTemplate': '#card-template'
  },
  'cardName2': {
    'title': 'Челябинская область',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    'cardTemplate': '#card-template'
  },
  'cardName3': {
    'title': 'Иваново',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    'cardTemplate': '#card-template'
  },
  'cardName4': {
    'title': 'Камчатка',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    'cardTemplate': '#card-template'
  },
  'cardName5': {
    'title': 'Холмогорский район',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    'cardTemplate': '#card-template'
  },
  'cardName6': {
    'title': 'Байкал',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    'cardTemplate': '#card-template'
  }
};

const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
}

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

const popupList = document.querySelectorAll('.popup'),
      formList = document.querySelectorAll('.popup__container');

const profileName = document.querySelector('.profile__name'),
      profileSubline = document.querySelector('.profile__subline'),
      profileAddButton = document.querySelector('.profile__add-button'),
      profileEditButton = document.querySelector('.profile__edit-button');

const album = document.querySelector('.album');

const formValidators = {};

function setValidation (settings) {
  formList.forEach(formElement => {
    const formValidator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

setValidation(settingsForValidation);

function createAlbumCard (cardTitle, cardImageLink, templateSelector) {
  const cardElement = new Card(cardTitle, cardImageLink, templateSelector, handleCardClick);

  return cardElement
}

function addAlbumCard (cardTitle, cardImageLink, templateSelector) {
  const newAlbumCard = createAlbumCard(cardTitle, cardImageLink, templateSelector);

  album.prepend(newAlbumCard.generateCard());
}

function loadDefaultCards (cardObject) {
  for (const value of Object.values(cardObject)) {
    addAlbumCard(value.title, value.imageLink, value.cardTemplate);
  }
}

loadDefaultCards(defaultCards);




function openPopup (popup) {
  popup.classList.add('popup_active');

  document.addEventListener('keydown', closeByEscape);
}

function handleCardClick (cardTitle, cardImageLink) {
  imagePopupContent.setAttribute('src', cardImageLink);
  imagePopupContent.setAttribute('alt', cardTitle);
  imagePopupContentTitle.textContent = cardTitle;

  openPopup(imagePopup);
}

function closePopup (popup) {
  popup.classList.remove('popup_active');

  document.removeEventListener('keydown', closeByEscape);
}







function renderProfilePopup () {
  formValidators['profile-form'].resetValidation();
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputAbout.value = profileSubline.textContent;
}

function displayProfilePopup () {
  renderProfilePopup();
  openPopup(profilePopup);
}


function renderCardPopup () {
  cardPopupForm.reset();
  formValidators['card-form'].resetValidation();
}

function displayCardPopup () {
  renderCardPopup();
  openPopup(cardPopup);
}







function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closePopup(profilePopup);
}

(function setProfileListeners () {
  profileEditButton.addEventListener('click', displayProfilePopup);
  profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
}) ();




function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addAlbumCard(cardPopupInputTitle.value, cardPopupInputLink.value, '#card-template');
  closePopup(cardPopup);
}

(function setCardListeners () {
  profileAddButton.addEventListener('click', displayCardPopup);
  cardPopupForm.addEventListener('submit', handleCardFormSubmit);
}) ();



(function setClosePopupListeners () {
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_active')) {
        closePopup(popup);
      } else if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    });
  });
}) ();


function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    closePopup(activePopup);
  }
}





