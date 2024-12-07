// Модуль отвечает за отрисовку окна с полноразмерным изображением

import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const socialCommentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = bigPictureElement.querySelector('.social__comment');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicturePopupClose();
  }
};

function bigPicturePopupClose () {
  document.querySelector('body').classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCancelElement.addEventListener('click', bigPicturePopupClose);

export {
  bigPictureElement,
  bigPictureImg,
  likesCount,
  socialCommentShownCount,
  socialCommentTotalCount,
  socialComments,
  socialComment,
  socialCaption,
  commentsLoader,
  onDocumentKeydown
};
