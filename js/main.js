const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

// Функция генерирует случайное число из диапазона от min до max включительно
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/*
  Функция создает генератор случайных чисел из диапазона от min до max включительно
  так, что число не повторяется, пока не будут перебраны все числа из диапазона
*/
const createRandomIntegerFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Функция генерирует идентификатор опубликованной фотографии
const generatePhotoId = createRandomIntegerFromRangeGenerator(1, 25);

// Функция генерирует url опубликованной фотографии
const generatePhotoUrl = createRandomIntegerFromRangeGenerator(1, 25);

// Функция генерирует идентификатор опубликованного комментария
const generateCommentId = createRandomIntegerFromRangeGenerator(1, Number.MAX_SAFE_INTEGER);

// Функция генерирует текст коментария
const generateCommentMessage = (array) => {
  const resultMessages = [];
  for (let i = 1; i <= getRandomInteger(1, 2); i++) {
    resultMessages.push(array[getRandomInteger(0, array.length - 1)]);
  }
  return resultMessages.join(' ');
};

// Функция генерирует имя комментатора
const generateCommentName = (array) => array[getRandomInteger(0, array.length - 1)];

// Функция генерирует объект - комментарий
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateCommentMessage(COMMENTS),
  name: generateCommentName(NAMES)
});

// Функция генерирует массив из объектов - комментарий
const createComments = () => {
  const resultComments = [];
  const commentsCount = getRandomInteger(1, 30);
  for (let i = 0; i <= commentsCount; i++) {
    resultComments.push(createComment());
  }
  return resultComments;
};

// Функция генерирует объект - описание фотографии, опубликованной пользователем
const createPhotoCard = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}`,
  description: 'Описание фотографии. Описание придумайте самостоятельно.',
  likes: getRandomInteger(15, 200),
  comments: createComments()
});

// Функция генерирует массив из объектов - описание фотографии, опубликованной пользователем
const createPhotoCards = () => {
  const resultPhotoCards = [];
  for (let i = 0; i < 25; i++) {
    resultPhotoCards.push(createPhotoCard());
  }
  return resultPhotoCards;
};

createPhotoCards();
