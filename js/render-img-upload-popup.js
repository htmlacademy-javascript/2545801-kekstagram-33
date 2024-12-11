// Модуль отвечает за рендер попапа с загрузкой изображения

import '../vendor/nouislider/nouislider.js';
import {isEscapeKey} from './util.js';
import {
  MIN_PREVIEW_IMAGE_SCALE_VALUE,
  MAX_PREVIEW_IMAGE_SCALE_VALUE,
  PREVIEW_IMAGE_SCALE_STEP_VALUE
} from './const.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview').querySelector('img');

const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const sliderEffect = imgUploadEffectLevel.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadEffectLevel.querySelector('.effect-level__value');
const imgUploadEffects = imgUploadForm.querySelector('.img-upload__effects');

let currentScalePreviewValue = MAX_PREVIEW_IMAGE_SCALE_VALUE;
let imgUploadEffectsId = document.getElementById('effect-none').id;

// Функция cбрасывает масштаб изображения
const resetScalePreview = () => {
  currentScalePreviewValue = MAX_PREVIEW_IMAGE_SCALE_VALUE;
  scaleControlValue.value = `${MAX_PREVIEW_IMAGE_SCALE_VALUE * 100}%`;
  imgUploadPreview.style.transform = `scale(${MAX_PREVIEW_IMAGE_SCALE_VALUE})`;
};

// Функция cбрасывает фильтры изображения
const resetImgUploadEffects = () => {
  if (imgUploadEffectsId === 'effect-none') {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
  }
};

// Функция открывает попап с изображением для загрузки
const openImgUploadPopup = () => {
  resetScalePreview();
  resetImgUploadEffects();
  document.querySelector('body').classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция закрывает попап с изображением для загрузки
const closeImgUploadPopup = () => {
  document.querySelector('body').classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция закрывает попап с изображением для загрузки при нажатии клавиши Escape
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadPopup();
  }
}

imgUploadForm.addEventListener('change', openImgUploadPopup);
imgUploadCancel.addEventListener('click', closeImgUploadPopup);

// Функция изменяет текущее значение масштаба изображения
const changeScalePreview = (edgeValue, step) => {
  if (currentScalePreviewValue === edgeValue) {
    currentScalePreviewValue = edgeValue;
    scaleControlValue.value = `${currentScalePreviewValue * 100}%`;
  } else {
    currentScalePreviewValue += step;
    scaleControlValue.value = `${currentScalePreviewValue * 100}%`;
    imgUploadPreview.style.transform = `scale(${currentScalePreviewValue})`;
  }
};

// Функция уменьшает масштаб изображения
const onScaleControlSmallerClick = () => {
  changeScalePreview(MIN_PREVIEW_IMAGE_SCALE_VALUE, -PREVIEW_IMAGE_SCALE_STEP_VALUE);
};

// Функция увеличивает масштаб изображения
const onScaleControlBiggerClick = () => {
  changeScalePreview(MAX_PREVIEW_IMAGE_SCALE_VALUE, PREVIEW_IMAGE_SCALE_STEP_VALUE);
};

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

// Слайдер эффектов
noUiSlider.create(sliderEffect, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => parseFloat(value.toFixed(1)),
    from: (value) => Number(value),
  },
});

// Функция обновляет настройки слайдера эффектов
const updateSlider = (id) => {
  switch (id) {
    case 'effect-none':
    case 'effect-chrome':
    case 'effect-sepia':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'effect-marvin':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1,
        format: {
          to: function (value) {
            return parseFloat(value);
          },
          from: function (value) {
            return parseFloat(value);
          }
        }
      });
      break;
    case 'effect-phobos':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'effect-heat':
      sliderEffect.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      break;
  }
};

imgUploadEffects.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgUploadEffectLevel.classList.remove('hidden');
    imgUploadEffectsId = evt.target.id;
    updateSlider(imgUploadEffectsId);
  }
});

// Функция применяет выбранный эффект к изображению
const changeEffect = (id, value) => {
  switch (id) {
    case 'effect-chrome':
      imgUploadPreview.style.filter = `grayscale(${value})`;
      break;
    case 'effect-sepia':
      imgUploadPreview.style.filter = `sepia(${value})`;
      break;
    case 'effect-marvin':
      imgUploadPreview.style.filter = `invert(${value}%)`;
      break;
    case 'effect-phobos':
      imgUploadPreview.style.filter = `blur(${value}px)`;
      break;
    case 'effect-heat':
      imgUploadPreview.style.filter = `brightness(${value})`;
      break;
    case 'effect-none':
      imgUploadPreview.style.filter = 'none';
      break;
    default:
      imgUploadPreview.style.filter = 'none';
  }
};

sliderEffect.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderEffect.noUiSlider.get();
  changeEffect(imgUploadEffectsId, effectLevelValue.value);
});

export {imgUploadForm, closeImgUploadPopup};
