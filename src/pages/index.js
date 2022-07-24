import './index.css'

import {
  settingsForValidation,
  settingsForApi,
  formList,
  profileAddButton,
  profileEditButton,
  profileAvatarButton
 } from "../scripts/constants/constants.js";

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
} from "../scripts/constants/constants.js";

import { Card } from '../scripts/components/Card.js';
import { Section } from '../scripts/components/Section.js';
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from '../scripts/components/Popup/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/Popup/PopupWithImage.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api';


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
      item.madeByUser = (item.owner._id === '7f4ca6fbd40eec1df06ec21f') ? true : false;
      item.likedByUser = (item.likes.some(user => user._id === '7f4ca6fbd40eec1df06ec21f')) ? true : false;

      const newCard = new Card(item, cardTemplateSelector, handleCardClick, handleCardRemoval, api);
      const newCardElement = newCard.generateCard();

      return newCardElement
    }
  },
  cardContainerSelector
);

const formValidators = {};







(function setCohortCards () {
  api.getCohortCards()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      cardSection.addItems(data.slice().reverse());
    })
    .catch((err) => {
      console.log(err);
    });
})();

(function setProfileData () {
  api.getUserInfo()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      userData.setUserInfo(data.name, data.about);
      userData.setUserAvatar(data.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
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

function handleCardRemoval (evt, cardId) {
  deletePopup.cardElement = evt.target.closest('.album__card');
  deletePopup.cardId = cardId;

  deletePopup.openPopup();
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      userData.setUserInfo(data.name, data.about);
      profilePopup.closePopup();
    })
    .catch((err) => {
      profilePopup.returnErrorMessage(err);
    })
    .finally(() => {
      setTimeout(() => {
        profilePopup.toggleSubmitLoading('Сохранить')
      }, 200);
     });
}

function handleAvatarFormSubmit (evt) {
  const inputValues = avatarPopup.getInputValues();

  evt.preventDefault();

  avatarPopup.toggleSubmitLoading('Сохранение');

  api.patchUserAvatar(inputValues['link-input'])
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      userData.setUserAvatar(data.avatar);
      avatarPopup.closePopup();
    })
    .catch((err) => {
      avatarPopup.returnErrorMessage(err);
    })
    .finally(() => {
      setTimeout(() => {
        avatarPopup.toggleSubmitLoading('Сохранить');
      }, 200);
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      cardSection.addItems([{
          name: data.name,
          link: data.link,
          owner: {
            _id: data.owner._id
          },
          _id: data._id,
          likes: []
        }]
      );
      cardPopup.closePopup();
    })
    .catch((err) => {
      cardPopup.returnErrorMessage(err);
    })
    .finally(() => {
      setTimeout(() => {
        cardPopup.toggleSubmitLoading('Создать');
      }, 200);
    });
}

function handleDeleteFormSubmit (evt) {
  evt.preventDefault();

  deletePopup.toggleSubmitLoading('Да');

  api.deleteCard(deletePopup.cardId)
    .then((res) => {
      if (res.ok) {
        deletePopup.cardElement.remove();
        deletePopup.closePopup();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      deletePopup.returnErrorMessage(err);
    })
    .finally(() => {
      setTimeout(() => {
        deletePopup.toggleSubmitLoading('Да');
      }, 200);
    })
}




(function setPopupListeners () {
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
})();

