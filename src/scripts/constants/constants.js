export const settingsForValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
};

export const settingsForApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'f438dcb5-8fef-4aba-b8aa-e100fa71cd0a',
    'Content-Type': 'application/json'
  }
}

export const formList = document.querySelectorAll('.popup__container');

export const profileAddButton = document.querySelector('.profile__add-button'),
             profileEditButton = document.querySelector('.profile__edit-button'),
             profileAvatarButton = document.querySelector('.profile__avatar-button');

export const cardContainerSelector = '.album',
             cardTemplateSelector = '#card-template';

export const imagePopupSelector = '.popup_type_image-view',
             profilePopupSelector = '.popup_type_profile-edit',
             cardPopupSelector = '.popup_type_card-add',
             avatarPopupSelector = '.popup_type_avatar-edit',
             deletePopupSelector = '.popup_type_card-delete';

export const userNameSelector = '.profile__name',
             userAboutSelector = '.profile__subline',
             userAvatarSelector = '.profile__avatar';
