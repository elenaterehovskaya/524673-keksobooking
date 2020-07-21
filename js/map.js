'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinMainMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      window.form.address.value = Math.floor(pinMain.offsetLeft + 0.5 * window.util.PIN_MAIN_WIDTH) + ', ' + Math.floor(pinMain.offsetTop + window.util.PIN_MAIN_HEIGHT_ACTIVE);
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
