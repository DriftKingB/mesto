const popup = document.querySelector('.popup'),
      profilePopupForm = document.querySelector('.popup__container'),
      profilePopupInputName = popup.querySelector('.popup__input_type_name'),
      profilePopupInputAbout = popup.querySelector('.popup__input_type_about'),
      profilePopupCloseButton = popup.querySelector('.popup__close-button');

const profileName = document.querySelector('.profile__name'),
      profileSubline = document.querySelector('.profile__subline'),
      profileEditButton = document.querySelector('.profile__edit-button');

const albumLikeButtons = document.querySelectorAll('.album__like-button');



function renderProfilePopup () {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputAbout.value = profileSubline.textContent;
}

function openProfilePopup () {
  popup.classList.add('popup_active');
  renderProfilePopup();
}

function closeProfilePopup () {
  popup.classList.remove('popup_active');
}

function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileSubline.textContent = profilePopupInputAbout.value;
  closeProfilePopup();
}



profileEditButton.addEventListener('click', openProfilePopup);

profilePopupCloseButton.addEventListener('click', closeProfilePopup);

profilePopupForm.addEventListener('submit', handleProfileFormSubmit);

for (let i = 0; i < albumLikeButtons.length; i++) {
  albumLikeButtons[i].addEventListener('click', function (evt) {
    evt.target.classList.toggle('album__like-button_active');
  });
}



