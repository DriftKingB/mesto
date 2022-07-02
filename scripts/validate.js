
function showInputError (formElement, inputElement, errorMessage, classObject) {
  const errorElement = formElement.querySelector(`${classObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.add(classObject.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (formElement, inputElement, classObject) {
  const errorElement = formElement.querySelector(`${classObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.remove(classObject.inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, classObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classObject);
  } else {
    hideInputError(formElement, inputElement, classObject);
  }
}

function setValidationListeners (formElement, classObject) {
  const inputList = Array.from(formElement.querySelectorAll(classObject.inputSelector));
  const buttonElement = formElement.querySelector(classObject.submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(formElement, input, classObject);
      toggleButtonState(inputList, buttonElement, classObject);
    })
  })
}

function hasInvalidInput (inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement, classObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(classObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function enableValidation (classObject) {
  const formList = Array.from(document.querySelectorAll(classObject.formSelector));
  formList.forEach(form => setValidationListeners(form, classObject));
}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
});
