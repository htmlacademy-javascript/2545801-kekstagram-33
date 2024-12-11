// Модуль отвечает за фильтр отрисованных изображений

import {MAX_RANDOM_IMAGES_VALUE} from './const.js';
import {getRandomUniqArray, debounce} from './util.js';
import {renderThumbnails} from './render-thumbnails.js';

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

// Функиця очищает все миниатюры
const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((picture) => {
    picture.remove();
  });
};

// Функция очищает активный класс фильтра
const clearActiveButtonClass = () => {
  const filterButtonActive = imgFilters.querySelector('.img-filters__button--active');
  filterButtonActive.classList.remove('img-filters__button--active');
};

// Функция возвращает массив с уникальными миниатюрами
const getRandomThumbnails = (pictures) => {
  const picturesCopy = pictures.slice();
  return getRandomUniqArray(picturesCopy).slice(0, MAX_RANDOM_IMAGES_VALUE);
};

// Функция ранжирует миниаюры по количеству комментариев
const compareThumbnailsByComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

// Функция возвращает массив с обсуждаемыми миниатюрами
const getDiscussedThumbnails = (pictures) => {
  const picturesCopy = pictures.slice();
  return picturesCopy.sort(compareThumbnailsByComments);
};

// Функция рендерит миниатюры согласно выбранному фильтру
const renderFilteredThumbnails = (pictures) => {
  imgFilters.classList.remove('img-filters--inactive');

  filterDefault.addEventListener('click', debounce((evt) => {
    clearActiveButtonClass();
    if (evt.target === filterDefault) {
      filterDefault.classList.add('img-filters__button--active');
    }
    clearThumbnails();
    renderThumbnails(pictures);
  }));

  filterRandom.addEventListener('click', debounce((evt) => {
    clearActiveButtonClass();
    if (evt.target === filterRandom) {
      filterRandom.classList.add('img-filters__button--active');
    }
    clearThumbnails();
    renderThumbnails(getRandomThumbnails(pictures));
  }));

  filterDiscussed.addEventListener('click', debounce((evt) => {
    clearActiveButtonClass();
    if (evt.target === filterDiscussed) {
      filterDiscussed.classList.add('img-filters__button--active');
    }
    clearThumbnails();
    renderThumbnails(getDiscussedThumbnails(pictures));
  }));
};

export {renderFilteredThumbnails};
