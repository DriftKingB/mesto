var popup = document.querySelector('.popup'),
    popupItems = document.querySelectorAll('.popup__item'),
    closeButton = document.querySelector('.popup__close-button'),
    saveButton = document.querySelector('.popup__save-button');

var profileName = document.querySelector('.profile__name'),
    profileSubline = document.querySelector('.profile__subline'),
    editButton = document.querySelector('.profile__edit-button');


function popupRender () {
  popupItems[0].value = profileName.textContent;
  popupItems[1].value = profileSubline.textContent;
}

function popupClose () {
  popup.classList.remove('popup_active');
}

function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = popupItems[0].value;
  profileSubline.textContent = popupItems[1].value;
  popupClose();
}

editButton.addEventListener("click", function () { popup.classList.add('popup_active'); popupRender() });
closeButton.addEventListener("click", popupClose);
saveButton.addEventListener("click", formSubmitHandler);

