export const defaultCards = [
  {
    'title': 'Архыз',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    'templateSelector': '#card-template'
  },
  {
    'title': 'Челябинская область',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    'templateSelector': '#card-template'
  },
  {
    'title': 'Иваново',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    'templateSelector': '#card-template'
  },
  {
    'title': 'Камчатка',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    'templateSelector': '#card-template'
  },
  {
    'title': 'Холмогорский район',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    'templateSelector': '#card-template'
  },
  {
    'title': 'Байкал',
    'imageLink': 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    'templateSelector': '#card-template'
  }
]

export const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
}

export const formList = document.querySelectorAll('.popup__container');

export const profileAddButton = document.querySelector('.profile__add-button'),
             profileEditButton = document.querySelector('.profile__edit-button');

export const cardContainerSelector = '.album',
             imagePopupSelector = '.popup_type_image-view',
             profilePopupSelector = '.popup_type_profile-edit',
             cardPopupSelector = '.popup_type_card-add',
             userNameSelector = '.profile__name',
             userAboutSelector = '.profile__subline';

