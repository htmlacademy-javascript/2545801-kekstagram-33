// Модуль отвечает за фильтр отрисованных изображений

import {MAX_RANDOM_IMAGES_VALUE} from './const.js';
import {getRandomUniqArray} from './util.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltresForm = imgFilters.querySelector('.img-filters__form');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

let currentFilter = filterDefault.id;

// Функиця очищает все миниатюры
const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((picture) => {
    picture.remove();
  });
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

// Функция возвращает массив миниатюр согласно выбранному фильтру
function getFilterThumbnails(pictures) {
  let filteredThumbnails = [];

  if (currentFilter === filterDefault.id) {
    filteredThumbnails = pictures;
  }
  if (currentFilter === filterRandom.id) {
    filteredThumbnails = getRandomThumbnails(pictures);
  }
  if (currentFilter === filterDiscussed.id) {
    filteredThumbnails = getDiscussedThumbnails(pictures);
  }

  return filteredThumbnails;
}

// Функция рендерит миниатюры согласно выбранному фильтру
const renderFilteredThumbnails = (cb) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFiltresForm.addEventListener('click', (evt) => {
    clearThumbnails();
    const filterButton = evt.target.closest('.img-filters__button');
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    currentFilter = document.querySelector('.img-filters__button--active').id;
    cb();
  });
};

export {getFilterThumbnails, renderFilteredThumbnails};
