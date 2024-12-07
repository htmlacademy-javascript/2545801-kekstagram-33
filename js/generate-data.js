// Модуль отвечает за генерацию моковых данных

import {getRandomInteger, createRandomIntegerFromRangeGenerator} from './util.js';
import {NAMES, MESSAGES} from './const.js';

// Функция генерирует идентификатор опубликованной фотографии
const generatePhotoId = createRandomIntegerFromRangeGenerator(1, 25);

// Функция генерирует url опубликованной фотографии
const generatePhotoUrl = createRandomIntegerFromRangeGenerator(1, 25);

// Функция генерирует идентификатор опубликованного комментария
const generateCommentId = createRandomIntegerFromRangeGenerator(1, Number.MAX_SAFE_INTEGER);

// Функция генерирует случайное сообщение комментария из переданного массива сообщений
const generateCommentMessage = (array) => {
  const resultCommentMessages = [];
  for (let i = 1; i <= getRandomInteger(1, 2); i++) {
    resultCommentMessages.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return resultCommentMessages.join(' ');
};

// Функция получает случаное имя комментатора из переданного массива имен
const getCommentName = (array) => array[getRandomInteger(0, array.length - 1)];

// Функция генерирует объект - комментарий
const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateCommentMessage(MESSAGES),
  name: getCommentName(NAMES)
});

// Функция генерирует массив из объектов - комментарий
const generateComments = () => Array.from({length: getRandomInteger(1, 30)}, generateComment);

// Функция геерирует объект - описание опубликованной фотографии
const generatePhotoCard = () => ({
  id: generatePhotoId(),
  url: `/photos/${generatePhotoUrl()}.jpg`,
  description: 'Описание фотографии.',
  likes: getRandomInteger(15, 200),
  comments: generateComments()
});

// Функция генерирует массив из объектов - описание опубликованной фотографии
const generatePhotoCards = () => Array.from({length: 25}, generatePhotoCard);

export {generatePhotoCards};
