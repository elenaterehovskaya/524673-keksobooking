'use strict';

(function () {
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
  var advertsData = [];

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

  for (var i = 0; i < 8; i++) {
    var xi = getRandomNumber(0, window.map.map.offsetWidth - window.map.PIN_WIDTH);
    var yi = getRandomNumber(130, 630 - window.map.PIN_HEIGHT);
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

  window.data = {
    advertsData: advertsData
  };
})();
