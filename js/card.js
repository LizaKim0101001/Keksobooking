//import './data.js';
//import {offerItem} from './data.js';
import './database-json.js'

// функция для отрисовки popup для каждой метки
const createPopup = function (i, data) {
  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
  const offerElement = similarOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').src = data[i].author.avatar;
  offerElement.querySelector('.popup__title').textContent = data[i].offer.title;
  offerElement.querySelector('.popup__text--price').innerHTML = data[i].offer.price + '<span>₽/ночь</span>';
  offerElement.querySelector('.popup__type').textContent = data[i].offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = data[i].offer.rooms + ' ' + 'комнат(ы)' + ' ' + data[i].offer.guests + ' ' + 'гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +data[i].offer.checkin +', выезд до ' + data[i].offer.checkout;
  offerElement.querySelector('.popup__description').textContent = data[i].offer.description;
  let featureList = offerElement.querySelector('.popup__features')
  if (!data[i].offer.features){
    featureList.remove()
  } else {
    if (!data[i].offer.features.includes('wifi')){
      featureList.querySelector('.popup__feature--wifi').remove();
    }
    if (!data[i].offer.features.includes('dishwasher')){
      featureList.querySelector('.popup__feature--dishwasher').remove();
    }
    if (!data[i].offer.features.includes('parking')){
      featureList.querySelector('.popup__feature--parking').remove();
    }
    if (!data[i].offer.features.includes('washer')){
      featureList.querySelector('.popup__feature--washer').remove();
    }
    if (!data[i].offer.features.includes('elevator')){
      featureList.querySelector('.popup__feature--elevator').remove();
    }
    if (!data[i].offer.features.includes('conditioner')){
      featureList.querySelector('.popup__feature--conditioner').remove();
    }
  }
  const photosList = offerElement.querySelector('.popup__photos');
  const popupPhoto = offerElement.querySelector('.popup__photo');
  if (!data[i].offer.photos){
    photosList.remove()
  } else {
    popupPhoto.remove()
    data[i].offer.photos.forEach((item) => {
      const popupPhotoClone = popupPhoto.cloneNode(true);
      popupPhotoClone.src = item;
      photosList.appendChild(popupPhotoClone);
    });

  }
  return offerElement;
};

export { createPopup};
