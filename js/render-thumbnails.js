// Модуль отвечает за рендер миниатюр

import {openBigPicturePopup} from './render-big-picture-popup';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

// Функция рендерит одну миниатюру
const renderThumbnail = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicturePopup(picture);
  });

  return pictureElement;
};

// Функция рендерит все миниатюры
const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    picturesFragment.appendChild(renderThumbnail(picture));
  });

  picturesElement.appendChild(picturesFragment);
};

export {renderThumbnails};
