// Модуль содержит утилитарные функции

import {DATA_ERROR_MESSAGE_TIME, RERENDER_DELAY} from './const.js';

// Функция возвращает случайное число из диапазона от min до max включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция возвращает массив со случайными уникальными элементами
const getRandomUniqArray = (array) => {
  const arrayCopy = array.slice();
  const uniqArray = [];

  for (let i = 0; i < arrayCopy.length; i++) {
    const randomId = getRandomInteger(0, arrayCopy.length - 1);
    uniqArray.push(arrayCopy[randomId]);
    arrayCopy.splice(randomId, 1);
  }

  return uniqArray;
};

// Функция показывает сообщение об ошибке загрузки данных
const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorFragment = document.createDocumentFragment();
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  dataErrorFragment.appendChild(dataErrorElement);
  document.body.appendChild(dataErrorFragment);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_MESSAGE_TIME);
};

// Функция проверяет нажата ли клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция игнорирует нажатие Escape когда в фокусе текстовое поле
const onTextInputFocusKeydown = (evt) => {
  evt.stopPropagation();
};

// Функция устранения дребезга
const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomUniqArray, showDataError, isEscapeKey, onTextInputFocusKeydown, debounce};
