'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_HEIGHT_ACTIVE = 87;

  window.util = {
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT,
    PIN_MAIN_HEIGHT_ACTIVE: PIN_MAIN_HEIGHT_ACTIVE,


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
    }
  };
})();
