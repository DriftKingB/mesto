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

function popupCloseByEnter (event) {
  if ((window.getComputedStyle(popup)['display'] !== 'none') && (event.keyCode === 13)) {
    saveButton.click();
  } else {
    return
  }
}

editButton.addEventListener("click", function () { popup.classList.add('popup_active'); popupRender() });
closeButton.addEventListener("click", popupClose);
saveButton.addEventListener("click", formSubmitHandler);
document.addEventListener("keyup", popupCloseByEnter);

