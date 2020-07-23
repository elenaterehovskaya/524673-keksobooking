'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var limits = {
    minX: 0 - window.util.PIN_MAIN_WIDTH / 2,
    minY: 130,
    maxX: 1200 + window.util.PIN_MAIN_WIDTH / 2,
    maxY: 630 - window.util.PIN_MAIN_HEIGHT_ACTIVE
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      if (pinMainCoords.x < limits.minX) {
        pinMainCoords.x = limits.minX;
      }

      if (pinMainCoords.x > limits.maxX) {
        pinMainCoords.x = limits.maxX;
      }

      if (pinMainCoords.y < limits.minY) {
        pinMainCoords.y = limits.minY;
      }

      if (pinMainCoords.y > limits.maxY) {
        pinMainCoords.y = limits.maxY;
      }

      pinMain.style.left = pinMainCoords.x + 'px';
      pinMain.style.top = pinMainCoords.y + 'px';

      window.form.address.value = Math.floor(pinMain.offsetLeft + window.util.PIN_MAIN_WIDTH / 2) + ', ' + Math.floor(pinMain.offsetTop + window.util.PIN_MAIN_HEIGHT_ACTIVE);
    };

    var pinMainMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', pinMainMouseMoveHandler);
      document.removeEventListener('mouseup', pinMainMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMainMouseMoveHandler);
    document.addEventListener('mouseup', pinMainMouseUpHandler);
  });
})();
