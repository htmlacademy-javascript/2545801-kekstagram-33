// Модуль отвечает за загрузку и рендер данных

import {showDataError} from './util.js';
import {getData} from './api.js';
import {renderThumbnails} from './render-thumbnails.js';
import {renderFilteredThumbnails} from './filter-thumbnails.js';

// Функция загружает и рендерит все данные на странице
const renderData = () => {
  getData()
    .then((pictures) => {
      renderThumbnails(pictures);
      renderFilteredThumbnails(pictures);
    })
    .catch(() => showDataError());
};

export {renderData};
