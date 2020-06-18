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
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var PIN_MAIN_ACTIVE_HEIGHT = 87;

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

var map = document.querySelector('.map');
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
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

// /**
//  * Создаёт карточку объявления и заполняет её данными из объекта
//  * @param {Array} cardData объекта с данными
//  * @return {Node} cardElement DOM-элемент на основе JS-объекта
//  */
/*
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
*/

var mapPinMain = map.querySelector('.map__pin--main'); // Метка, являющаяся контролом указания адреса объявления
var mapFilters = document.querySelector('.map__filters'); // Форма с фильтрами
var mapFilterList = mapFilters.querySelectorAll('select'); // Список фильтров
var form = document.querySelector('.ad-form'); // Форма подачи заявления
var formElementList = form.querySelectorAll('fieldset'); // Список элементов формы подачи заявления
var formAddress = form.querySelector('[name=address]'); // Поле адреса

/**
 * Выключает активный режим (страница находится в неактивном состоянии: отключены форма и карта)
 */
var offActiveMode = function () {
  for (var k = 0; k < mapFilterList.length; k++) {
    mapFilterList[k].disabled = true;
  }

  for (var m = 0; m < formElementList.length; m++) {
    formElementList[m].disabled = true;
  }

  formAddress.value = Math.floor(mapPinMain.offsetLeft + 0.5 * PIN_MAIN_WIDTH) + ', ' + Math.floor(mapPinMain.offsetTop + 0.5 * PIN_MAIN_HEIGHT);
};

offActiveMode();

/**
 * Включает активный режим (страница находится в активном состоянии: позволяет вносить изменения в форму и отправлять её на сервер,
 * просматривать похожие объявления на карте, фильтровать их и уточнять подробную информацию о них, показывая для каждого из объявлений карточку)
 */
var onActiveMode = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  for (var n = 0; n < mapFilterList.length; n++) {
    mapFilterList[n].disabled = false;
  }

  for (var p = 0; p < formElementList.length; p++) {
    formElementList[p].disabled = false;
  }

  formAddress.value = Math.floor(mapPinMain.offsetLeft + 0.5 * PIN_MAIN_WIDTH) + ', ' + Math.floor(mapPinMain.offsetTop + PIN_MAIN_ACTIVE_HEIGHT);

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < advertsData.length; j++) {
    fragment.appendChild(renderPin(advertsData[j]));
  }

  pinList.appendChild(fragment);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    onActiveMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    onActiveMode();
  }
});

var numRooms = form.querySelector('#room_number'); // количество комнат
var numGuests = form.querySelector('#capacity'); // количество гостей (спальных мест)
var userRooms = parseInt(numRooms.value, 10); // число комнат, выбранных пользователем
var userGuests = parseInt(numGuests.value, 10); // число гостей, выбранных пользователем

/**
 * Проверяет соответствие количества комнат с количеством размещаемых в них гостей (спальных мест)
 * @param {number} guests число гостей
 */
var checkRooms = function (guests) {
  if (guests === 3) {
    if (userRooms !== 1) {
      numRooms.setCustomValidity('Число комнат для трёх гостей может быть только 3');
    }
  }
  if (guests === 2) {
    if (userRooms !== 2 && userRooms !== 3) {
      numRooms.setCustomValidity('Чило комнат для двух гостей может быть 3 или 2');
    }
  }
  if (guests === 1) {
    if (userRooms !== 1 && userRooms !== 2 && userRooms !== 3) {
      numRooms.setCustomValidity('Чило комнат для одного гостя может быть 3, 2 или 1');
    }
  }
  if (guests === 0) {
    if (userRooms !== 100) {
      numRooms.setCustomValidity('100 комнат — не для гостей');
    }
  }
};

/**
 * Проверяет соответствие количества гостей (спальных мест) с количеством комнат
 * @param {number} rooms число комнат
 */
var checkGuests = function (rooms) {
  if (rooms === 1) {
    if (userGuests !== 1) {
      numGuests.setCustomValidity('Число гостей в одной комнате может быть только 1');
    }
  }
  if (rooms === 2) {
    if (userGuests !== 1 && userGuests !== 2) {
      numGuests.setCustomValidity('Число гостей в двух комнатах может быть 2 или 1');
    }
  }
  if (rooms === 3) {
    if (userGuests !== 1 && userGuests !== 2 && userGuests !== 3) {
      numGuests.setCustomValidity('Число гостей в трёх комнатах может быть 3, 2 или 1');
    }
  }
  if (rooms === 100) {
    if (userGuests !== 0) {
      numGuests.setCustomValidity('100 комнат — не для гостей');
    }
  }
};

numRooms.setCustomValidity('');
numGuests.setCustomValidity('');

numRooms.addEventListener('change', function () {
  checkRooms(userGuests);
});

numGuests.addEventListener('change', function () {
  checkGuests(userRooms);
});
