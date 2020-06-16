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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

/**
 * Получает массив заданной длины из исходного
 * @param {Array} array массив с данными
 * @param {number} n число искомых элементов
 * @return {Array} массив заданной длины
 */
var getRandomArray = function (array, n) {
  var resultArray = [];

  for (var i = 0; i < n; i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
};

var advertsData = [];

for (var i = 0; i < 8; i++) {
  var xi = getRandomNumber(0, map.offsetWidth - PIN_WIDTH);
  var yi = getRandomNumber(130, 630 - PIN_HEIGHT);
  var advertData = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: getRandomItem(OBJECT_TITLES),
      address: xi + ', ' + yi,
      price: getRandomNumber(2000, 10000),
      type: getRandomItem(OBJECT_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomItem(OBJECT_TIMES),
      checkout: getRandomItem(OBJECT_TIMES),
      features: getRandomArray(OBJECT_FEATURES, getRandomNumber(1, OBJECT_FEATURES.length)),
      description: '',
      photos: getRandomArray(OBJECT_PHOTOS, getRandomNumber(1, OBJECT_PHOTOS.length))
    },
    location: {
      x: xi,
      y: yi
    }
  };

  advertsData.push(advertData);
}

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

/**
 * Создаёт метку на карте и заполняет её данными из объекта
 * @param {Array} pinData объекта с данными
 * @return {Node} pinElement DOM-элемент на основе JS-объекта
 */
var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pinData.location.x + 0.5 * PIN_WIDTH + 'px';
  pinElement.style.top = pinData.location.y + PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pinData.author.avatar;
  pinElement.querySelector('img').alt = pinData.offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < advertsData.length; j++) {
  fragment.appendChild(renderPin(advertsData[j]));
}

pinList.appendChild(fragment);

/**
 * Создаёт карточку объявления и заполняет её данными из объекта
 * @param {Array} cardData объекта с данными
 * @return {Node} cardElement DOM-элемент на основе JS-объекта
 */
var renderCard = function (cardData) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
  cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';

  if (cardData.offer.type === 'flat') {
    cardElement.querySelector('.popup__type').textContent = 'Квартира';
  }

  if (cardData.offer.type === 'bungalo') {
    cardElement.querySelector('.popup__type').textContent = 'Бунгало';
  }

  if (cardData.offer.type === 'house') {
    cardElement.querySelector('.popup__type').textContent = 'Дом';
  }

  if (cardData.offer.type === 'palace') {
    cardElement.querySelector('.popup__type').textContent = 'Дворец';
  }

  if (cardData.offer.rooms === 1) {
    if (cardData.offer.guests === 1) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комната для ' + cardData.offer.guests + ' гостя';
    }
    if (cardData.offer.guests === 0 && cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комната для ' + cardData.offer.guests + ' гостей';
    }
  }

  if (cardData.offer.rooms >= 2 && cardData.offer.rooms <= 4) {
    if (cardData.offer.guests === 1) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостя';
    }
    if (cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    }
  }

  if (cardData.offer.rooms >= 5 && cardData.offer.rooms <= 10) {
    if (cardData.offer.guests === 1) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостя';
    }
    if (cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
      cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
    }
  }

  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

  var listFeatures = cardElement.querySelector('.popup__features').querySelectorAll('li');

  for (var k = cardData.offer.features.length; k < listFeatures.length; k++) {
    listFeatures[k].style = 'display: none';
  }

  cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
  cardElement.querySelector('.popup__photos').querySelector('img').src = cardData.offer.photos[0];

  for (var m = 1; m < cardData.offer.photos.length; m++) {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.src = cardData.offer.photos[m];
    newPhoto.width = 45;
    newPhoto.height = 40;
    newPhoto.alt = 'Фотография жилья' + m;
    cardElement.querySelector('.popup__photos').append(newPhoto);
  }
  return cardElement;
};

map.insertBefore(renderCard(advertsData[0]), map.querySelector('.map__filters-container'));
