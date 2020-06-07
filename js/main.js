'use strict';

var OBJECT_TITLES = [
  'Уютное гнёздышко для молодожёнов',
  'Из окон открывается потрясающий вид на город',
  'Лучшее предложение для студентов',
  'Подходит для размещения с домашними животными',
  'Отель расположен в центре Токио',
  'Большая квартира с видом на парк',
  'Уютный домик в зелёном районе',
  'Всё для отдыха большой компанией'
];

var OBJECT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OBJECT_TIMES = ['12:00', '13:00', '14:00'];
var OBJECT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

/**
 * Получает случайное число из диапазона
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} случайное число из диапазона
 */
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

/**
 * Получает случайное значение из массива
 * @param {Array} array массив с данными
 * @return {*} случайное значение из массива
 */
var getRandomItem = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

var advertsData = [];

for (var i = 0; i < 8; i++) {
  var advertData = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getRandomItem(OBJECT_TITLES),
      address: getRandomNumber(0, 1024) + ',' + getRandomNumber(130, 630),
      price: getRandomNumber(2000, 20000),
      type: getRandomItem(OBJECT_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(0, 100),
      checkin: getRandomItem(OBJECT_TIMES),
      checkout: getRandomItem(OBJECT_TIMES),
      features: getRandomItem(OBJECT_FEATURES),
      description: '',
      photos: getRandomItem(OBJECT_PHOTOS)
    },
    location: {
      x: getRandomNumber(0, 1024),
      y: getRandomNumber(130, 630)
    }
  };

  advertsData.push(advertData);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * Создаёт метку на карте и заполняет её данными из массива
 * @param {Array} pinData массив с данными
 * @return {Node} pinElement DOM-элемент на основе JS-объекта
 */
var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pinData.location.x - 25 + 'px';
  pinElement.style.top = pinData.location.y - 70 + 'px';
  pinElement.querySelector('img').src = pinData.author.avatar;
  pinElement.querySelector('img').alt = pinData.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < advertsData.length; j++) {
  fragment.appendChild(renderPin(advertsData[j]));
}

pinList.appendChild(fragment);
