// Модуль отвечает за загрузку и рендер данных

import {showDataError, debounce} from './util.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';
import {getFilterThumbnails, renderFilteredThumbnails} from './filter-thumbnails.js';

// Функция загружает и рендерит все данные на странице
const renderData = () => {
  getData()
    .then((pictures) => {
      renderThumbnails(pictures);
      renderFilteredThumbnails(debounce(() => renderThumbnails(getFilterThumbnails(pictures))));
    })
    .catch(() => showDataError());
};

export {renderData};
