// Модуль отвечает за валидацию формы

import '../vendor/pristine/pristine.min.js';
import {MAX_HASHTAGS_COUNT, TEXT_DESCRIPTION_LENGTH} from './const.js';
import {onTextInputFocusKeydown} from './util.js';
import {imgUploadForm} from './render-img-upload-popup.js';

const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Функция стросит массив из хештегов и приводит каждый элемент к нижнему регистру
const getHashtags = (string) => string.trim().split(/\s+/).map((hashtag) => hashtag.toLowerCase());

// Функция проверяет валидность хештега
const validateTextHashtags = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.every((hashtag) => {
    if (hashtag === '') {
      return true;
    }
    /^#[a-zA-Zа-яА-Я0-9]{1,19}$/.test(hashtag);
  });
};

// Функция проверяет уникальность хештега
const isUnique = (string) => {
  const hashtags = getHashtags(string);
  const unique = new Set(hashtags);
  return hashtags.length === unique.size;
};

// Функция проверяет количество хештегов
const checkHashtagsCount = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

// Функция проверяет валиндость комментария
const validateTextDescription = (value) => value.length <= TEXT_DESCRIPTION_LENGTH;

pristine.addValidator(
  textHashtags,
  validateTextHashtags,
  'Невалидный хэштег'
);

pristine.addValidator(
  textHashtags,
  isUnique,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  textHashtags,
  checkHashtagsCount,
  `Не больше ${MAX_HASHTAGS_COUNT} Хештегов`
);

pristine.addValidator(
  textDescription,
  validateTextDescription,
  `Длина комментария больше ${TEXT_DESCRIPTION_LENGTH} символов!`
);

textHashtags.addEventListener('keydown', onTextInputFocusKeydown);
textDescription.addEventListener('keydown', onTextInputFocusKeydown);

export {pristine};
