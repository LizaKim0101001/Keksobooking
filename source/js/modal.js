// функция для создания ошибки при работе
const createError = function (text) {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error')
  const errorElement = errorTemplate.cloneNode('true')
  const body = document.querySelector('body');
  errorElement.querySelector('.error__message').textContent = text;
  body.appendChild(errorElement)
  const errorButton = errorElement.querySelector('.error__button');
  errorButton.addEventListener('click', ()=> {
    errorElement.remove()
  })
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      errorElement.remove()
    }
  })
}

// функция при удачной отправки данных на сервер
const createSuccess = function (text) {
  const successTemplate = document.querySelector('#success').content.querySelector('.success')
  const successElement = successTemplate.cloneNode('true')
  const body = document.querySelector('body');
  successElement.querySelector('.success__message').textContent = text;
  body.appendChild(successElement)
  document.addEventListener('click', ()=> {
    successElement.remove()
  })
  document.addEventListener('keydown', function(evt){
    if (evt.keyCode === 27) {
      successElement.remove()
    }
  })
}


export {createError, createSuccess}
