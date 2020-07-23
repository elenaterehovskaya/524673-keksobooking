'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 62;
  var PIN_MAIN_HEIGHT_ACTIVE = 80;

  window.util = {
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_HEIGHT_ACTIVE: PIN_MAIN_HEIGHT_ACTIVE,

    /**
     * Если произошло событие клика
     * @param {function} action Действие, кот. при этом событии выполняется
     */
    isClickEvent: function (action) {
      action();
    },

    /**
     * Если произошло событие нажатия левой кнопки мыши
     * @param {Object} evt Объект, описывающий событие, кот. произошло
     * @param {function} action Действие, кот. при этом событии выполняется
     */
    isMouseDownEvent: function (evt, action) {
      if (evt.button === LEFT_BUTTON) {
        evt.preventDefault();
        action();
      }
    },

    /**
     * Если произошло событие нажатия клавиши Enter
     * @param {Object} evt Объект, описывающий событие, кот. произошло
     * @param {function} action Действие, кот. при этом событии выполняется
     */
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },

    /**
     * Если произошло событие нажатия клавиши Esc
     * @param {Object} evt Объект, описывающий событие, кот. произошло
     * @param {function} action Действие, кот. при этом событии выполняется
     */
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    }
  };
})();
