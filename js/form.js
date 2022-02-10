import {mapCreate} from './map.js'
import {SIMILAR_ANNOUNCEMENT_COUNT} from './main.js'

//  объект с мин ценами на жильей, которые соответсвуют выбору типа жильй
let pricePerNight = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

// функция для получения минимальной цены и выставление ее в placegolder
let searchMinPrice = function(variant){
  let inputPrice = document.querySelector('#price');
  if(variant === 'palace'){
    inputPrice.placeholder = pricePerNight.palace
  }
  if(variant === 'flat') {
    inputPrice.placeholder = pricePerNight.flat
  }
  if (variant === 'house'){
    inputPrice.placeholder = pricePerNight.house
  }
  if (variant === 'bungalow'){
    inputPrice.placeholder = pricePerNight.bungalow
  }
  let minPrice = inputPrice.placeholder;
  return minPrice
}

// функция для получения данных из селекта (тип жилья) и выставление минимальной цены в зависимости от выбора пользователя типа жилья
let typeOfSelect = document.querySelector('#type');
typeOfSelect.addEventListener('change', () => {
  let variant = typeOfSelect.value;
  searchMinPrice(variant)
})


// валидация формы для price
const priceInput = document.querySelector('#price')
const MAX_PRICE = 1000000

priceInput.addEventListener('input', () => {
  let variant = typeOfSelect.value
  const priceValue = priceInput.value

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity('Цена за жилье не может превышать ' + MAX_PRICE)
  } else if (priceValue < searchMinPrice(variant)) {
    priceInput.setCustomValidity('Цена за данный вид жилья не может быть менее ' + searchMinPrice(variant))
  } else {
    priceInput.setCustomValidity('')
  }
  priceInput.reportValidity();
})


// функция делающая время въезда и выезда одинаковым при изменении одного или другого селекта
let timeOfCheckin = document.querySelector('#timein');
let timeOfChekout = document.querySelector('#timeout')

timeOfCheckin.addEventListener('change', () => {
  let variant = timeOfCheckin.value;
  timeOfChekout.value = variant;
})
timeOfChekout.addEventListener('change', () => {
  let variant = timeOfChekout.value;
  timeOfCheckin.value = variant;
})

// валидация формы для title
const MAX_TITLE_LENGHT = 100;
const MIN_TITLE_LENGHT = 30;

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueLenght = titleInput.value.length;

  if (valueLenght < MIN_TITLE_LENGHT) {
    titleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGHT - valueLenght) + ' симв.');
  } else if (valueLenght > MAX_TITLE_LENGHT) {
    titleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGHT) +' симв.')
  } else {
    titleInput.setCustomValidity('')
  }
  titleInput.reportValidity();
})


// функция валидации select для форм количество комнат и гостей. Поля должны быть синхронизированны
const roomSelect = document.querySelector('#room_number')
const capacitySelect = document.querySelector('#capacity')
const capacityOptions = capacitySelect.querySelectorAll('option')


roomSelect.addEventListener('change', () => {
  const roomValue = roomSelect.value
  console.log(roomValue);
  if(roomValue == 1){
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[3].disabled = true;
    capacityOptions[2].disabled = false
  } else if (roomValue == 2) {
    capacityOptions[0].disabled = true;
    capacityOptions[3].disabled = true;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
  } else if (roomValue == 3) {
    capacityOptions[3].disabled = true;
    capacityOptions[0].disabled = false;
    capacityOptions[1].disabled = false;
    capacityOptions[2].disabled = false;
  } else if (roomValue == 100) {
    capacityOptions[0].disabled = true;
    capacityOptions[1].disabled = true;
    capacityOptions[2].disabled = true;
    capacityOptions[3].disabled = false;
  }
})

//  функция для отключения и включения форм
const activeDisactiveInput = function (trueOrFalse, formName, inputType) {
  const formForDisabled = document.querySelector(formName);
  const allInput = formForDisabled.querySelectorAll(inputType);

  for (let i=0; i< allInput.length; i++){
    allInput[i].disabled = trueOrFalse;
  }
  if (trueOrFalse) {
    formForDisabled.classList.add('ad-form--disabled')
  } else {
    formForDisabled.classList.remove('ad-form--disabled')
  }
}

// использование функции. отключаем до загрузки карты
activeDisactiveInput(true, '.ad-form', 'fieldset');
activeDisactiveInput(true, '.map__filters', 'select')

// при изменении формы получаем значения полей
const mapFilters = document.querySelector('.map__filters')

// функция для очистки меток
let clean = function(){
  let markers = document.querySelector('.leaflet-marker-pane');
  markers.innerHTML='';
}

//функция слушатель событий. при изменении поля фильтрации очищается карта от меток и далее происзодит рангирование и отрисовка новых меток
const changeMapForm = (cb) => {
  mapFilters.addEventListener('change', ()=> {
    clean();
    cb()
  })
}



export {activeDisactiveInput, mapFilters, changeMapForm}
