// Модуль отвечает за отправку формы

import {isEscapeKey} from './util.js';
import {imgUploadForm, closeImgUploadPopup} from './render-img-upload-popup.js';
import {pristine} from './validate-form.js';
import {sendData} from './api.js';

const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправка...'
};

// Функция ставит блок на кнопку отправки данных
const blockSubmitButton = () => {
  imgUploadSubmit.disabled = true;
  imgUploadSubmit.textContent = SubmitButtonText.SENDING;
};

// Функция снимает блок с кнопки отправки данных
const unblockSubmitButton = () => {
  imgUploadSubmit.disabled = false;
  imgUploadSubmit.textContent = SubmitButtonText.IDLE;
};

// Функция закрывает попап после отправки данных
const closeMessage = (element, button, overlay, cb) => {
  const removeElement = () => {
    document.removeEventListener('keydown',onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
    element.remove();
    cb();
  };

  button.addEventListener('click', () => {
    removeElement();
  });

  // Функция закрывает попап после отправки данных при нажатии клавиши Escape
  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeElement();
    }
  }

  // Функция закрывает попап после отправки данных при клике в пустую область окна
  function onDocumentClick (evt) {
    if (!overlay.contains(evt.target)) {
      removeElement();
    }
  }

  document.addEventListener('keydown',onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

// Функция показывает попап об успешной отправке
const showSuccessMessage = () => {
  const successFragment = document.createDocumentFragment();
  const successElement = successTemplate.cloneNode(true);
  const successInner = successElement.querySelector('.success__inner');
  const successButton = successElement.querySelector('.success__button');
  successFragment.appendChild(successElement);
  document.body.appendChild(successFragment);

  closeMessage(successElement, successButton, successInner, closeImgUploadPopup);
};

// Функция показывает попап с ошибкой
const showErrorMessage = () => {
  const errorFragment = document.createDocumentFragment();
  const errorElement = templateError.cloneNode(true);
  const errorInner = errorElement.querySelector('.error__inner');
  const errorButton = errorElement.querySelector('.error__button');
  errorFragment.appendChild(errorElement);
  document.body.appendChild(errorFragment);

  closeMessage(errorElement, errorButton, errorInner, () => {});
};

// Функция отправляет форму на сервер
const setUserFormSubmit = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(
          (response) => {
            if (!response.ok) {
              showErrorMessage();
            }
            showSuccessMessage();
          }
        )
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit};
