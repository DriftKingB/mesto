import '../pages/index.css'

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
 } from "./constants/constants.js";

import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from './components/Popup/PopupWithForm.js';
import { PopupWithImage } from './components/Popup/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';


const profilePopup = new PopupWithForm(
  profilePopupSelector,
  {
    submitCallback: handleProfileFormSubmit,
    renderer: renderProfilePopup
  });

const cardPopup = new PopupWithForm(
  cardPopupSelector,
  {
    submitCallback: handleCardFormSubmit,
    renderer: renderCardPopup
  });

const imagePopup = new PopupWithImage(imagePopupSelector);

const userData = new UserInfo({
  userNameSelector: userNameSelector,
  userAboutSelector: userAboutSelector
});

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



function createCardSection (cardArray) {
  const cardList = new Section({
    items: cardArray,
    renderer: (item) => {
        const newCard = new Card(item.title, item.imageLink, item.templateSelector, handleCardClick);
        const newCardElement = newCard.generateCard();
        cardList.addItem(newCardElement);
      }
    },
    cardContainerSelector
  )

  return cardList
}

function addAlbumCards (cardArray) {
  const cardList = createCardSection(cardArray);

  cardList.renderItems();
}

addAlbumCards(defaultCards);




function handleCardClick (cardTitle, cardImageLink) {
  imagePopup.image.setAttribute('src', cardImageLink);
  imagePopup.image.setAttribute('alt', cardTitle);
  imagePopup.imageTitle.textContent = cardTitle;

  imagePopup.openPopup();
}






function renderProfilePopup () {
  const userInfo = userData.getUserInfo();
  this._getInputValues();

  formValidators['profile-form'].resetValidation();
  this.inputs['name-input'].value = userInfo['userName'];
  this.inputs['about-input'].value = userInfo['userAbout'];
}



function renderCardPopup () {
  this.formElement.reset();
  formValidators['card-form'].resetValidation();
}








function handleProfileFormSubmit (evt) {
  const inputValues = profilePopup._getInputValues();

  evt.preventDefault();

  userData.setUserInfo(inputValues['name-input'], inputValues['about-input'])

  profilePopup.closePopup();
}



function handleCardFormSubmit (evt) {
  const inputValues = cardPopup._getInputValues();

  evt.preventDefault();

  addAlbumCards([{
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




