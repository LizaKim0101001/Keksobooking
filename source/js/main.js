'use strict'
import './card.js';
import './form.js';
//import './data.js'
import './map.js'
import './try.js'
import './database-json.js'
import './modal.js'
import {getData} from './database-json.js'
import {createError} from './modal.js'
import {mapCreate} from './map.js'
import { activeDisactiveInput, changeMapForm} from './form.js'


const SIMILAR_ANNOUNCEMENT_COUNT = 10

const fetchData = getData(
  (data) => {
    activeDisactiveInput(false, '.ad-form', 'fieldset');
    activeDisactiveInput(false, '.map__filters', 'select')


    mapCreate(data);
    changeMapForm(() => mapCreate(data));
  },
  (err) => {
    createError('Ошибка работы сервера. Объявления не будут отображены на карте')
  })

fetchData()

export {SIMILAR_ANNOUNCEMENT_COUNT}
