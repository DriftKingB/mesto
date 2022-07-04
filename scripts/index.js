import { Card } from './Card.js';
import { FormValidator, hideInputError } from "./FormValidator.js";

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

const profilePopup = document.querySelector('.popup_type_profile-edit');
const cardPopup = document.querySelector('.popup_type_card-add');
const profileForm = profilePopup.querySelector('.popup__container');
const cardForm = cardPopup.querySelector('.popup__container');

const profileFormValidator = new FormValidator(settingsForValidation, profileForm);
const cardFormValidator = new FormValidator(settingsForValidation, cardForm);



function addAlbumCard (cardTitle, cardImageLink, templateSelector) {
  const newAlbumCard = new Card(cardTitle, cardImageLink, templateSelector);
  const album = document.querySelector('.album');

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

function closePopup (popup) {
  popup.classList.remove('popup_active');

  document.removeEventListener('keydown', closeByEscape);
}

function resetProfileValidation () {
  profileFormValidator._inputList.forEach(input => {
    hideInputError(profilePopup, input, settingsForValidation);
  });
  profileFormValidator._toggleButtonState();
}

function resetCardValidation () {
  cardFormValidator._inputList.forEach(input => {
    hideInputError(cardPopup, input, settingsForValidation);
  });
  cardFormValidator._toggleButtonState();
}



function renderProfilePopup () {
  const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
  const profilePopupInputAbout = profilePopup.querySelector('.popup__input_type_about');
  const profileName = document.querySelector('.profile__name');
  const profileSubline = document.querySelector('.profile__subline');

  resetProfileValidation();
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputAbout.value = profileSubline.textContent;
}

function displayProfilePopup () {
  renderProfilePopup();
  openPopup(profilePopup);
}




function renderCardPopup () {
  const cardPopupForm = cardPopup.querySelector('.popup__container');

  cardPopupForm.reset();
  resetCardValidation();
}

function displayCardPopup () {
  renderCardPopup();
  openPopup(cardPopup);
}







function handleProfileFormSubmit (evt) {
  const profilePopupInputName = profilePopup.querySelector('.popup__input_type_name');
  const profilePopupInputAbout = profilePopup.querySelector('.popup__input_type_about');
  const profileName = document.querySelector('.profile__name');
  const profileSubline = document.querySelector('.profile__subline');


  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closePopup(profilePopup);
}

(function setProfileListeners () {
  const profileEditButton = document.querySelector('.profile__edit-button');
  const profilePopupForm = profilePopup.querySelector('.popup__container');

  profileEditButton.addEventListener('click', displayProfilePopup);
  profilePopupForm.addEventListener('submit', handleProfileFormSubmit);
}) ();




function handleCardFormSubmit (evt) {
  const cardPopupInputTitle = cardPopup.querySelector('.popup__input_type_name');
  const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_about');

  evt.preventDefault();
  addAlbumCard(cardPopupInputTitle.value, cardPopupInputLink.value, '#card-template');
  closePopup(cardPopup);
}

(function setCardListeners () {
  const profileAddButton = document.querySelector('.profile__add-button');
  const cardPopupForm = cardPopup.querySelector('.popup__container');

  profileAddButton.addEventListener('click', displayCardPopup);
  cardPopupForm.addEventListener('submit', handleCardFormSubmit);
}) ();



(function setClosePopupListeners () {
  const popupList = document.querySelectorAll('.popup');

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

(function setValidation () {
  profileFormValidator.enableValidation();
  cardFormValidator.enableValidation();
}) ();




