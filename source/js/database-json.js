import {createPopup} from './card.js';
import {mapCreate, inputAdres, mainPinMarker} from './map.js';
import {createError, createSuccess} from './modal.js'
import {activeDisactiveInput} from './form.js'


const getData = (onSuccess, onError) => () => {
  return fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        activeDisactiveInput(false, '.map__filters', 'select')
        return response.json()
      }
    })
    .then((json) => {
      console.log('reload');
      onSuccess(json)
    })
    .catch((err) => {
      onError(err);
    })
}


// функция для оправки формы через фетч

const announcementForm = document.querySelector('.ad-form')

announcementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const formMap = document.querySelector('.map__filters')
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        formMap.reset()
        announcementForm.reset()
        mainPinMarker.setLatLng({
          lat: 35.67842,
          lng: 139.76102,
        })
        inputAdres.value = '35.67842, 139.76102'
        createSuccess('Форма успешно отправлена');
      } else {
        createError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      createError('Не удалось отправить форму. Попробуйте ещё раз');
    });
})

export {getData}
