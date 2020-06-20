'use strict';

(function () {
  /**
 * Выключает активный режим, страница находится в неактивном состоянии: отключены форма и карта
 */
  var offActiveMode = function () {
    for (var i = 0; i < window.map.filterList.length; i++) {
      window.map.filterList[i].disabled = true;
    }

    for (var j = 0; j < window.form.elementList.length; j++) {
      window.form.elementList[j].disabled = true;
    }

    window.form.address.value = Math.floor(window.map.pinMain.offsetLeft + 0.5 * window.map.PIN_MAIN_WIDTH) + ', ' + Math.floor(window.map.pinMain.offsetTop + 0.5 * window.map.PIN_MAIN_HEIGHT);
  };

  offActiveMode();

  /**
 * Включает активный режим, страница находится в активном состоянии: включены форма и карта
 */
  var onActiveMode = function () {
    window.map.map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');

    for (var i = 0; i < window.map.filterList.length; i++) {
      window.map.filterList[i].disabled = false;
    }

    for (var j = 0; j < window.form.elementList.length; j++) {
      window.form.elementList[j].disabled = false;
    }

    window.form.address.value = Math.floor(window.map.pinMain.offsetLeft + 0.5 * window.map.PIN_MAIN_WIDTH) + ', ' + Math.floor(window.map.pinMain.offsetTop + window.map.PIN_MAIN_ACTIVE_HEIGHT);

    for (var n = 0; n < window.form.numRooms.length; n++) {
      if (window.form.numRooms[n].value === '1') {
        window.form.numRooms[n].selected = true;
      }
    }

    for (var m = 0; m < window.form.numGuests.length; m++) {
      if (window.form.numGuests[m].value === '1') {
        window.form.numGuests[m].selected = true;
      }
    }

    var fragment = document.createDocumentFragment();

    for (var k = 0; k < window.data.advertsData.length; k++) {
      fragment.appendChild(window.pin.renderPin(window.data.advertsData[k]));
    }

    window.map.pinList.appendChild(fragment);
  };

  window.map.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      onActiveMode();
    }
  });

  window.map.pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onActiveMode();
    }
  });
})();
