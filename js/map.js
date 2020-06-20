'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ACTIVE_HEIGHT = 87;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main'); // метка, являющаяся контролом указания адреса объявления
  var pinList = document.querySelector('.map__pins'); // метки с похожими объявлениями на карте
  var filters = document.querySelector('.map__filters'); // форма с фильтрами
  var filterList = filters.querySelectorAll('select'); // список фильтров

  window.map = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_ACTIVE_HEIGHT: PIN_MAIN_ACTIVE_HEIGHT,
    map: map,
    pinMain: pinMain,
    pinList: pinList,
    filterList: filterList
  };
})();
