'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var limits = {
    minX: 0,
    minY: 130,
    maxX: 1200,
    maxY: 630
  };

  pinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMainMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      limits.maxX = map.clientWidth - window.util.PIN_MAIN_WIDTH / 2;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (pinMainCoords.x < limits.minX - window.util.PIN_MAIN_WIDTH / 2) {
        pinMainCoords.x = limits.minX;
      }

      if (pinMainCoords.x > limits.maxX + window.util.PIN_MAIN_WIDTH / 2) {
        pinMainCoords.x = limits.maxX;
      }

      if (pinMainCoords.y < limits.minY) {
        pinMainCoords.y = limits.minY;
      }

      if (pinMainCoords.y > limits.maxY - window.util.PIN_MAIN_HEIGHT) {
        pinMainCoords.y = limits.maxY;
      }

      pinMain.style.left = pinMainCoords.x + 'px';
      pinMain.style.top = pinMainCoords.y + 'px';

      window.form.address.value = Math.floor(pinMain.offsetLeft + 0.5 * window.util.PIN_MAIN_WIDTH) + ', ' + Math.floor(pinMain.offsetTop);
    };

    var pinMainMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      pinMain.removeEventListener('mousemove', pinMainMouseMoveHandler);
      pinMain.removeEventListener('mouseup', pinMainMouseUpHandler);
    };

    pinMain.addEventListener('mousemove', pinMainMouseMoveHandler);
    pinMain.addEventListener('mouseup', pinMainMouseUpHandler);
  });
})();
