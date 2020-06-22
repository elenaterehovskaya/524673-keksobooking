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
    window.form.rooms.value = '1';
    window.form.rooms.selectedIndex = 0;
    window.form.guests.value = '3';
    window.form.guests.selectedIndex = 0;
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
    window.form.rooms.value = '1';
    window.form.rooms.selectedIndex = 0;
    window.form.guests.value = '1';
    window.form.guests.selectedIndex = 2;

    /**
     * Обработчик успешной загрузки данных с сервера
     * @param {Object} advertsData данные (список похожих объявлений), полученные с сервера
     */
    var successHandler = function (advertsData) {
      var fragment = document.createDocumentFragment();

      for (var k = 0; k < advertsData.length; k++) {
        if (advertsData.offer !== '') {
          fragment.appendChild(window.pin.renderPin(advertsData[k]));
        }
      }
      window.map.pinList.appendChild(fragment);
    };

    /**
     * Обработчик ошибки, произошедшей при получении данных с сервера
     * @param {string} errorMessage текст сообщения
     */
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; width: 300px; padding: 25px 50px; text-align: center; color: #ff5635; background-color: white; box-shadow: 0 0 2px 2px #ff6547';
      node.style.position = 'absolute';
      node.style.top = '25%';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '21px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.load(successHandler, errorHandler);
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
