//import {offerItem} from './data.js';
import {createPopup} from './card.js';
import {activeDisactiveInput} from './form.js'
import {SIMILAR_ANNOUNCEMENT_COUNT} from './main.js'

const map = L.map('mapCanvas')
  .on('load', () => {
    activeDisactiveInput(false, '.ad-form')
    console.log('загрузилось');
  })
  .setView({
    lat: 35.6700 ,
    lng: 139.7500,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainPinMarker = L.marker(
  { lat: 35.67842,
    lng: 139.76102,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

/*
нужно настроить фильтрацию объявлений
-при изменении параметров в фильтрах нужно удалять старые метки и добавялять новые отфильтрованные

работа фильтров
- рангировать исходные данные (чем больше совпадений с данныит из фильтров, тем выше ранг). максимальное значение ранга = 5
- выдавать не больше 10 меток

*/
// инпуты отвечающие за фильтрацию
const housingType = document.querySelector('#housing-type') // по типу жилья
const housingPrice = document.querySelector('#housing-price') // по цене
const housingRooms = document.querySelector('#housing-rooms') //по кол-ву комнат
const housingGuests = document.querySelector('#housing-guests') //по кол-ву гостей
const housingFeatures = document.querySelector('#housing-features') // особбености
const housingFeaturesItem = housingFeatures.querySelectorAll('.map__checkbox') // для получения value checkbox:checked

// функция для создания массива из значений checkbox:checked
const returnList = function (){
  let list =[];
  housingFeaturesItem.forEach((item) => {
    if (item.checked) {
      list.push(item.value)
    }
  });
  return list
}

// функция для проверки наличия переменной в массиве (фильтр features)
const checkFeature = function (array, value) {
  return array.some(arrVal => value === arrVal)
}

// функция для подсчета и присвоения ранга
const getAnnouncementRank = (announcement) => {
  let list = returnList()
  let rank = 0;
  let count = 0;

  if (housingPrice.value === 'any') {
    rank += 2;
  } else {
    if (housingPrice.value === 'low' && announcement.offer.price < 10000) {
      rank += 2;
    }
    if (housingPrice.value === 'middle' && announcement.offer.price >=10000 && announcement.offer.price < 50000) {
      rank += 2;
    }
    if (housingPrice.value === 'high' && announcement.offer.price >= 50000){
      rank += 2;
    }
  }
  if ((!announcement.offer.features && list.length === 0) || list.length === 0) {
    rank +=1
  }
  else {
    if (!announcement.offer.features) {
      rank += 0
    } else {
      list.forEach((item) => {
        if (checkFeature(announcement.offer.features, item)) {
          count +=1
        }
        if (count == list.length ) {
          rank +=1
        }
      });
    }
  }
  if (housingType.value === 'any' || housingType.value === announcement.offer.type){
    rank += 1;
  }

  if (housingRooms.value === 'any' || housingRooms.value == announcement.offer.rooms) {
    rank += 1;
  } else {
    if (housingRooms.value === '1' && announcement.offer.rooms >= 1) {
      rank +=1;
    }
    if (housingRooms.value === '2' && announcement.offer.rooms >= 2) {
      rank +=1;
    }
    if (housingRooms.value === '3' && announcement.offer.rooms >= 3) {
      rank +=1;
    }
  }
  if (housingGuests.value === 'any' || housingGuests.value == announcement.offer.guests ) {
    rank += 1;
  } else {
    if (housingGuests.value === '2' && announcement.offer.guests >=2) {
      rank += 1;
    }
    if (housingGuests.value === '1' && announcement.offer.guests >=1) {
      rank += 1;
    }
    if (housingGuests.value === '0' && announcement.offer.guests >=0) {
      rank += 1;
    }
  }
// для лучшей работы сортировки ранг уменьшается на 1 единицу
  return rank
}

// функция сортировки
const compareAnouncement = (announcementA, announcementB) => {
  const rankA = getAnnouncementRank(announcementA)
  announcementA['rank'] = rankA
  const rankB = getAnnouncementRank(announcementB)
  announcementB['rank'] = rankB
  return rankB - rankA;
}

// функция для создания меток на карте
const mapCreate = function (data) {
  const mainPinMarker = L.marker(
    { lat: 35.67842,
      lng: 139.76102,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  const icon = L.icon({
    iconUrl:'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let sortData = data.slice().sort(compareAnouncement);
  sortData.forEach((item, i) => {
    if (item.rank < 6) {
      sortData.splice(i, (sortData.length-1))
    }
  });

  sortData
    .slice(0, SIMILAR_ANNOUNCEMENT_COUNT)
    .forEach(({location}, i) => {

      let marker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon,
        },
      );

      marker
        .addTo(map)
        .bindPopup(
          createPopup(i, sortData),
          {
            keepInView: true,
          },
        )
    });
}

// заполнение input с адресом
const inputAdres = document.querySelector('#address');
inputAdres.value = '35.67842, 139.76102'

//dragstart
mainPinMarker.on('moveend', (evt) => {
  let coordinates = Object.values(evt.target.getLatLng());
  coordinates[0] = coordinates[0].toFixed(5)
  coordinates[1] = coordinates[1].toFixed(5)
  inputAdres.value = coordinates;
});

export {mapCreate, inputAdres, mainPinMarker}
