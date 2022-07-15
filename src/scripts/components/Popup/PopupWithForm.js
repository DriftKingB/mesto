import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback, onOpen }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._onOpen = onOpen;
    this._inputList = this._element.querySelectorAll('.popup__input');
    this.formElement = this._element.querySelector('.popup__container');
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach(input => {
      inputValues[input.id] = input.value;
    });

    return inputValues
  }

  setInputValues(inputValuesObject) {
    this._inputList.forEach(input => {
      const inputValue = inputValuesObject[input.id];

      input.value = inputValue;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener('submit', this._submitCallback);
  }

  openPopup() {
    this._onOpen();

    super.openPopup();
  }

  closePopup() {
    super.closePopup();

    this.formElement.reset();
  }
}
