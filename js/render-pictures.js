// Модуль отвечает за отрисовку миниатюр

import {generatePhotoCards} from './generate-data.js';

// Функция отрисовывает миниатюры
const renderPictures = () => {
  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const photoCards = generatePhotoCards();

  const picturesFragment = document.createDocumentFragment();

  photoCards.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureElement);
  });

  return picturesElement.appendChild(picturesFragment);
};

export {renderPictures};
