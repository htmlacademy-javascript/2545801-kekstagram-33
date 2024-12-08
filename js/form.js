// Модуль загрузки изображения

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
// const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
//
//
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
// const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
// const imgUploadPreview = imgUploadForm.querySelector('img');

const openImgUploadPopup = () => {
  document.querySelector('body').classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
};

const closeImgUploadPopup = () => {
  document.querySelector('body').classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';
};

imgUploadInput.addEventListener('click', openImgUploadPopup);
imgUploadCancel.addEventListener('click', closeImgUploadPopup);

//
//const pristine = new Pristine(imgUploadForm);

// const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
// const validateHashtag = () => {};

// pristine.addValidator(textHashtags, validateHashtag);

// imgUploadForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
//
//


// const imgZoomStep = 25;
// let currentImgScale = parseInt(scaleControlValue.value, 10);

scaleControlSmaller.addEventListener('click', () => {
  // currentImgScale -= imgZoomStep;
  // imgUploadPreview.style.transform = `scale(0.75)`;
});

scaleControlBigger.addEventListener('click', () => {
  // currentImgScale += imgZoomStep;
});
