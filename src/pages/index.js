import './index.css'

import {
  defaultCards,
  settingsForValidation,
  formList,
  profileAddButton,
  profileEditButton,
  cardContainerSelector,
  imagePopupSelector,
  profilePopupSelector,
  cardPopupSelector,
  userNameSelector,
  userAboutSelector
 } from "../scripts/constants/constants.js";

import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from '../scripts/components/Popup/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/Popup/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';


const profilePopup = new PopupWithForm(
  profilePopupSelector,
  {
    submitCallback: handleProfileFormSubmit,
    onOpen: updateProfileForm
  });

const cardPopup = new PopupWithForm(
  cardPopupSelector,
  {
    submitCallback: handleCardFormSubmit,
    onOpen: updateCardForm
  });

const imagePopup = new PopupWithImage(imagePopupSelector);

const userData = new UserInfo({
  userNameSelector: userNameSelector,
  userAboutSelector: userAboutSelector
});

const cardSection = new Section({
  defaultItems: defaultCards,
  renderer: (item) => {
      const newCard = new Card(item.title, item.imageLink, item.templateSelector, handleCardClick);
      const newCardElement = newCard.generateCard();

      return newCardElement
    }
  },
  cardContainerSelector
);

const formValidators = {};






(function setDefaultCards () {
  cardSection.addItems(cardSection.defaultItemList);
})();

function setValidation (settings) {
  formList.forEach(formElement => {
    const formValidator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

setValidation(settingsForValidation);



function handleCardClick (cardTitle, cardImageLink) {
  imagePopup.openPopup(cardTitle, cardImageLink);
}





function updateProfileForm () {
  const userInfo = userData.getUserInfo();

  formValidators['profile-form'].resetValidation();
  profilePopup.setInputValues({
    'name-input': userInfo['userName'],
    'about-input': userInfo['userAbout']
   });
}

function updateCardForm () {
  formValidators['card-form'].resetValidation();
}




function handleProfileFormSubmit (evt) {
  const inputValues = profilePopup.getInputValues();

  evt.preventDefault();

  userData.setUserInfo(inputValues['name-input'], inputValues['about-input'])

  profilePopup.closePopup();
}

function handleCardFormSubmit (evt) {
  const inputValues = cardPopup.getInputValues();

  evt.preventDefault();

  cardSection.addItems([{
      'title': inputValues['title-input'],
      'imageLink': inputValues['link-input'],
      'templateSelector': '#card-template'
    }]
  );

  cardPopup.closePopup();
}



(function setPopupListeners () {
  profilePopup.setEventListeners();
  cardPopup.setEventListeners();
  imagePopup.setEventListeners();

  profileAddButton.addEventListener('click', () => {
    cardPopup.openPopup();
  });

  profileEditButton.addEventListener('click', () => {
    profilePopup.openPopup();
  });
})();




