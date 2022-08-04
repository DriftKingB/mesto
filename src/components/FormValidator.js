export class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    this._buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`${this._settingsObject.errorClass}` + `${inputElement.id}`);

    inputElement.classList.add(this._settingsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`${this._settingsObject.errorClass}` + `${inputElement.id}`);

    inputElement.classList.remove(this._settingsObject.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
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

  _setValidationListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setValidationListeners();
  }
}


