import { getRandomNumber, getRandomArrayElement, getRandomArray } from './util.js'

// объявление переменных для создания рандомных массивов

// сопоставленный для карточек
const avatarItems = ['img/avatars/user01.png', 'img/avatars/user02.png',
  'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png',
  'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png',]
const typeItems = ['Дворец', 'Квартира', 'Дом', 'Бунгало']
//const typeItems = ['palace', 'flat', 'house', 'bungalow'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const featuresItems = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
/*const photoItems = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];*/
const descriprionItems  = [
  'уютное',
  'недалеко от центра',
  'в 5 минутах ходьбы от метро',
  'можно с животными',
  'подойдет для отдыха с детьми',
  'развитая инфраструктура',
  'рядом с круглосуточным магазином',
]
const numberOfCount = 8;
let offer = {}
let author = {}
let location = {}
// функция для создания объекта offer

const createOffer = () => {

  return {
    author: {avatar:avatarItems[getRandomArrayElement(avatarItems)]},
    offer: {
      title: 'Уютно и в центре',
      adress: 'location.' + getRandomNumber(0, 100, 0) + ' '+ 'location.' + getRandomNumber(0, 100, 0),
      price: getRandomNumber(0, 1000000, 0),
      type: typeItems[getRandomArrayElement(typeItems)],
      rooms: getRandomNumber(1, 20, 0),
      guests: getRandomNumber(1, 20, 0),
      checkin: checkin[getRandomArrayElement(checkin)],
      checkout: checkout[getRandomArrayElement(checkout)],
      features: getRandomArray(featuresItems),
      description: getRandomArray(descriprionItems),
    // photos: getRandomArray(photoItems),
    },
    locations: {
      lat: getRandomNumber(35.65000, 35.70000, 5),
      lng: getRandomNumber(139.70000, 139.80000, 5),
    },
  }
}

// создание и заполнение массива для нескольких объектов offer
let offerItem = new Array(numberOfCount).fill(null).map(()=> createOffer());




export {offerItem};
