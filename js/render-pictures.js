// Модуль отвечает за отрисовку фотографий

import {generatePhotoCards} from './generate-data.js';
import {
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
} from './render-big-picture-popup.js';

const photoCards = generatePhotoCards();

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = () => {

  const picturesFragment = document.createDocumentFragment();

  photoCards.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', () => {
      document.querySelector('body').classList.add('modal-open');
      document.addEventListener('keydown', onDocumentKeydown);
      bigPictureElement.classList.remove('hidden');
      bigPictureImg.src = url;
      likesCount.textContent = likes;
      socialCaption.textContent = description;
      socialComments.innerHTML = '';

      const renderComments = (array) => {
        array.forEach(({avatar, message, name}) => {
          const commentElement = socialComment.cloneNode(true);
          commentElement.querySelector('.social__picture').src = avatar;
          commentElement.querySelector('.social__picture').alt = name;
          commentElement.querySelector('.social__text').textContent = message;
          socialComments.appendChild(commentElement);
        });
      };

      socialCommentTotalCount.textContent = comments.length;

      const step = 5;
      let visibleCommentsCount = step;
      renderComments(comments.slice(0, visibleCommentsCount));

      commentsLoader.classList.remove('hidden');
      socialCommentShownCount.textContent = visibleCommentsCount;

      if (comments.length <= visibleCommentsCount) {
        commentsLoader.classList.add('hidden');
        socialCommentShownCount.textContent = comments.length;
      }

      const loadComments = () => {
        let commentsCount = visibleCommentsCount;
        renderComments(comments.slice(visibleCommentsCount, visibleCommentsCount += step));
        commentsCount += step;
        commentsLoader.classList.remove('hidden');
        if (commentsCount >= comments.length) {
          commentsCount = comments.length;
          commentsLoader.classList.add('hidden');
        }
        socialCommentShownCount.textContent = commentsCount;
      };

      commentsLoader.addEventListener('click', loadComments);
    });
  });

  picturesElement.appendChild(picturesFragment);
};

export {renderPictures};
