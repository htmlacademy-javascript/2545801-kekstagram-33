// Модуль отвечает за рендер попапа с полноразмерным изображением

import {INITIAL_COMMENTS_COUNT, VISIBLE_COMMENTS_COUNT_STEP} from './const.js';
import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const socialCommentShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPictureElement.querySelector('.social__comment-total-count');

let currentCommentsCount;
let swapArray = [];

// Функция рендерит комментарии под фото
const renderComments = (comments, startIndex, endIndex) => {
  swapArray = comments.slice();
  const slicedComments = comments.slice(startIndex, endIndex);
  slicedComments.forEach((comment) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    socialComments.appendChild(commentElement);
  });
};

// Функция открывает попап с полноразмерным фото
const openBigPicturePopup = (picture) => {
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('body').classList.add('modal-open');

  bigPictureElement.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.adddescription;
  socialCommentShownCount.textContent = INITIAL_COMMENTS_COUNT;
  socialCommentTotalCount.textContent = picture.comments.length;

  if (INITIAL_COMMENTS_COUNT >= picture.comments.length) {
    socialCommentShownCount.textContent = picture.comments.length;
    commentsLoader.classList.add('hidden');
  }

  socialComments.innerHTML = '';
  currentCommentsCount = INITIAL_COMMENTS_COUNT;
  renderComments(picture.comments, 0, currentCommentsCount);
};

// Функция загружает комментарии при нажатии на кнопку 'загрузить еще'
const loadMoreComments = () => {
  const visibleCommentsCount = currentCommentsCount + VISIBLE_COMMENTS_COUNT_STEP;
  renderComments(swapArray, currentCommentsCount, visibleCommentsCount);
  currentCommentsCount = visibleCommentsCount;
  socialCommentShownCount.textContent = Math.min(currentCommentsCount, swapArray.length);

  if (currentCommentsCount >= swapArray.length) {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', loadMoreComments);

// Функция закрывает попап с полноразмерным фото
const closeBigPicturePopup = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция закрывает попап с полноразмерным фото при нажатии клавиши Escape
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicturePopup();
  }
}

bigPictureCancelElement.addEventListener('click', closeBigPicturePopup);

export {openBigPicturePopup};
