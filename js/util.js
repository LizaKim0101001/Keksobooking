//функция для получения рандоного числа
function getRandomNumber(min, max, n) {
  if (min < 0 || max < 0) {
    console.log('Минимальное или максимальное число не могут быть отрицательными');
  }
  if (min > max){
    [min,max] = [max, min]
  }
  return (Math.random() * (max - min ) + min).toFixed(n);
}
// функция для получения рандомного числа значений и подбор самих значений с проверкой на повтор
const getRandomArrayElement = function (array) {
  return getRandomNumber(0, array.length-1, 0);
}
const getRandomArray = function (array) {
  let randomNumber = getRandomNumber(1, array.length, 0);
  let newArray =  [];
  for (let i = 0; i < randomNumber; i++){
    newArray[i] = array[getRandomNumber(0, randomNumber, 0)];
  }
  return newArray = _.uniq(newArray);
}
/* проверки на правильную работу функций

console.log(getRandomArray(featuresItems));
console.log(getRandomArray(photoItems));
console.log(getRandomArray(descriprionItems));
console.log(type[getRandomNumber(0 , type.length - 1, 0)]);
console.log('location.' + getRandomNumber(0, 100, 0) + ' '+ 'location.' + getRandomNumber(0, 100, 0));
*/



export {getRandomNumber, getRandomArrayElement, getRandomArray};
