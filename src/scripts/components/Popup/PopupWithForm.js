import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback, renderer }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._renderer = renderer;
    this._inputList = this._element.querySelectorAll('.popup__input');
    this.formElement = this._element.querySelector('.popup__container');
  }

  _getInputValues() {
    this.inputs = {};
    const inputValues = {};

    this._inputList.forEach(input => {
      inputValues[input.id] = input.value;
      this.inputs[input.id] = input;
    });

    return inputValues
  }

  setEventListeners() {
    super.setEventListeners();

    this.formElement.addEventListener('submit', this._submitCallback);
  }

  openPopup() {
    this._renderer();

    super.openPopup()
  }
}
