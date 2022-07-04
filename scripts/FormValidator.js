export class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    this._buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  }

  _setValidationListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(this._formElement, input, this._settingsObject);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some(input => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._setValidationListeners();
  }
}

function showInputError (formElement, inputElement, errorMessage, settingsObject) {
  const errorElement = formElement.querySelector(`${settingsObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
}

export function hideInputError (formElement, inputElement, settingsObject) {
  const errorElement = formElement.querySelector(`${settingsObject.errorClass}` + `${inputElement.id}`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, settingsObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement, settingsObject);
  }
}

