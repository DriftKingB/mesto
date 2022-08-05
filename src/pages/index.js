import './index.css'

import {
  settingsForValidation,
  settingsForApi,
  formList,
  profileAddButton,
  profileEditButton,
  profileAvatarButton
 } from "../constants/constants.js";

import {
  cardContainerSelector,
  cardTemplateSelector,
  imagePopupSelector,
  profilePopupSelector,
  cardPopupSelector,
  avatarPopupSelector,
  deletePopupSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector
} from "../constants/constants.js";

import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from '../components/Popup/PopupWithForm.js';
import { PopupWithImage } from '../components/Popup/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';




const api = new Api(settingsForApi);

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  {
    submitCallback: handleProfileFormSubmit,
    onOpen: updateProfileForm
  }
);

const cardPopup = new PopupWithForm(
  cardPopupSelector,
  {
    submitCallback: handleCardFormSubmit,
    onOpen: updateCardForm
  }
);

const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  {
    submitCallback: handleAvatarFormSubmit,
    onOpen: updateAvatarForm
  }
);

const deletePopup = new PopupWithForm(
  deletePopupSelector,
  {
    submitCallback: handleDeleteFormSubmit,
    onOpen: () => {}
  }
)

const imagePopup = new PopupWithImage(imagePopupSelector);

const userData = new UserInfo({
  userNameSelector: userNameSelector,
  userAboutSelector: userAboutSelector,
  userAvatarSelector: userAvatarSelector
});

const cardSection = new Section({
  renderer: (item) => {
      const newCardElement = createNewCard(item);

      cardSection.addItem(newCardElement);
    }
  },
  cardContainerSelector
);

const formValidators = {};




Promise.all([
  api.getUserInfo(),
  api.getCohortCards()
])
  .then(res => Promise.all(res))
  .then(([userInfo, cards]) => {
    userData.id = userInfo._id;
    userData.setUserInfo(userInfo.name, userInfo.about);
    userData.setUserAvatar(userInfo.avatar);
    cardSection.renderItems(cards.slice().reverse());
   })
  .catch(err => console.log(err));

function setValidation (settings) {
  formList.forEach(formElement => {
    const formValidator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

setValidation(settingsForValidation);

function createNewCard (cardInfo) {
  const cardHandlers = {
    click: handleCardClick,
    remove: handleCardRemoval,
    like: handleCardLike
  };
  const newCard = new Card(cardInfo, cardHandlers, cardTemplateSelector, userData.id);

  return newCard.generateCard();
}




function handleCardClick (card) {
  imagePopup.openPopup(card.cardTitle, card.cardImageLink);
}

function handleCardRemoval (card, evt) {
  card.cardElement = evt.target.closest('.card');
  deletePopup.card = card;

  deletePopup.openPopup();
}

function handleCardLike(card) {
  const request = (!card.likedByUser) ? api.putCardLike(card.id) : api.removeCardLike(card.id);

  card.toggleLikesLoad();
  request
    .then(data => card.setLikes(data.likes))
    .catch(err => console.log(err))
    .finally(() => card.toggleLikesLoad());
}




function updateProfileForm () {
  const userInfo = userData.getUserInfo();

  formValidators['profile-form'].resetValidation();
  profilePopup.setInputValues({
    'name-input': userInfo.name,
    'about-input': userInfo.about
   });
}

function updateCardForm () {
  formValidators['card-form'].resetValidation();
}

function updateAvatarForm () {
  formValidators['avatar-form'].resetValidation();
}




function handleProfileFormSubmit (evt) {
  const inputValues = profilePopup.getInputValues();

  evt.preventDefault();

  profilePopup.toggleSubmitLoading('Сохранение');

  api.patchUserInfo(inputValues['name-input'], inputValues['about-input'])
    .then(data => {
      userData.setUserInfo(data.name, data.about);
      profilePopup.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => { profilePopup.toggleSubmitLoading('Сохранить') }, 200);
    });
}

function handleAvatarFormSubmit (evt) {
  const inputValues = avatarPopup.getInputValues();

  evt.preventDefault();

  avatarPopup.toggleSubmitLoading('Сохранение');

  api.patchUserAvatar(inputValues['avatar-link-input'])
    .then(data => {
      userData.setUserAvatar(data.avatar);
      avatarPopup.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => { avatarPopup.toggleSubmitLoading('Сохранить') }, 200);
    });
}

function handleCardFormSubmit (evt) {
  const inputValues = cardPopup.getInputValues();

  evt.preventDefault();

  cardPopup.toggleSubmitLoading('Создание');

  api.postSectionItem({
      name: inputValues['title-input'],
      link: inputValues['link-input']
    })
    .then(data => {
      const newCardElement = createNewCard(data);

      cardSection.addItem(newCardElement);
      cardPopup.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => { cardPopup.toggleSubmitLoading('Создать') }, 200);
    });
}

function handleDeleteFormSubmit (evt) {
  const card = deletePopup.card;

  evt.preventDefault();

  deletePopup.toggleSubmitLoading('Да');

  api.deleteCard(card.id)
    .then(() => {
      card.removeCard();
      deletePopup.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => { deletePopup.toggleSubmitLoading('Да') }, 200);
    });
}




profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
deletePopup.setEventListeners();

profileAddButton.addEventListener('click', () => {
  cardPopup.openPopup();
});

profileEditButton.addEventListener('click', () => {
  profilePopup.openPopup();
});

profileAvatarButton.addEventListener('click', () => {
  avatarPopup.openPopup();
});

