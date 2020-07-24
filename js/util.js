'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 62;
  var PIN_MAIN_HEIGHT_ACTIVE = 80;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main'); // метка, являющаяся контролом указания адреса объявления

  window.util = {
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_HEIGHT_ACTIVE: PIN_MAIN_HEIGHT_ACTIVE,

    pinMainStartCoords: {
      x: pinMain.offsetLeft,
      y: pinMain.offsetTop
    },

    isClickEvent: function (action) {
      action();
    },

    isMouseDownEvent: function (evt, action) {
      if (evt.button === LEFT_BUTTON) {
        evt.preventDefault();
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },

    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    }
  };
})();
