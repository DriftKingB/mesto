const classObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: '.popup__input-error_type_'
}



function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`${classObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.add(classObject.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`${classObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.remove(classObject.inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setValidationListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(classObject.inputSelector));
  const buttonElement = formElement.querySelector(classObject.submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(formElement, input);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function hasInvalidInput (inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(classObject.inactiveButtonClass);
  }
}

function enableValidation (classObject) {
  const formList = Array.from(document.querySelectorAll(classObject.formSelector));
  formList.forEach(form => setValidationListeners(form));
}

enableValidation(classObject);
