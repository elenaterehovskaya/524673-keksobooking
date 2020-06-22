'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var form = window.form;
  var map = window.map;
  /**
 * Выключает активный режим, страница находится в неактивном состоянии: отключены форма и карта
 */
  var offActiveMode = function () {
    for (var i = 0; i < map.filterList.length; i++) {
      map.filterList[i].disabled = true;
    }

    for (var j = 0; j < form.elementList.length; j++) {
      form.elementList[j].disabled = true;
    }

    form.address.value = Math.floor(map.pinMain.offsetLeft + 0.5 * map.PIN_MAIN_WIDTH) + ', ' + Math.floor(map.pinMain.offsetTop + 0.5 * map.PIN_MAIN_HEIGHT);
    form.rooms.value = '1';
    form.rooms.selectedIndex = 0;
    form.guests.value = '3';
    form.guests.selectedIndex = 0;
  };

  offActiveMode();

  /**
 * Включает активный режим, страница находится в активном состоянии: включены форма и карта
 */
  var onActiveMode = function () {
    map.map.classList.remove('map--faded');
    form.form.classList.remove('ad-form--disabled');

    for (var i = 0; i < map.filterList.length; i++) {
      map.filterList[i].disabled = false;
    }

    for (var j = 0; j < form.elementList.length; j++) {
      form.elementList[j].disabled = false;
    }

    form.address.value = Math.floor(map.pinMain.offsetLeft + 0.5 * map.PIN_MAIN_WIDTH) + ', ' + Math.floor(map.pinMain.offsetTop + map.PIN_MAIN_ACTIVE_HEIGHT);
    form.rooms.value = '1';
    form.rooms.selectedIndex = 0;
    form.guests.value = '1';
    form.guests.selectedIndex = 2;

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
      map.pinList.appendChild(fragment);
    };

    /**
     * Обработчик ошибки, произошедшей при получении данных с сервера
     * @param {string} errorMessage текст сообщения
     */
    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = 100;
      node.style.position = 'absolute';
      node.style.top = '25%';
      node.style.left = 0;
      node.style.right = 0;
      node.style.width = '300px';
      node.style.margin = '0 auto';
      node.style.padding = '25px 50px';
      node.style.fontSize = '21px';
      node.style.textAlign = 'center';
      node.style.color = '#ff5635';
      node.style.backgroundColor = 'white';
      node.style.boxShadow = '0 0 2px 2px #ff6547';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.load(successHandler, errorHandler);
  };

  map.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_BUTTON) {
      onActiveMode();
    }
  });

  map.pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onActiveMode();
    }
  });
})();
