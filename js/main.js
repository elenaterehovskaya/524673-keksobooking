'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_ACTIVE_HEIGHT = 87;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main'); // метка, являющаяся контролом указания адреса объявления
  var filters = document.querySelector('.map__filters'); // форма с фильтрами
  var filterList = filters.querySelectorAll('select'); // список фильтров
  var houseTypeField = document.querySelector('#housing-type'); // фильтр: тип жилья

  var form = window.form;
  var advertsData = [];

  /**
 * Выключает активный режим, страница находится в неактивном состоянии: отключены форма и карта
 */
  var offActiveMode = function () {
    filterList.forEach(function (filter) {
      filter.disabled = true;
    });

    form.elementList.forEach(function (element) {
      element.disabled = true;
    });

    form.address.value = Math.floor(pinMain.offsetLeft + 0.5 * PIN_MAIN_WIDTH) + ', ' + Math.floor(pinMain.offsetTop + 0.5 * PIN_MAIN_HEIGHT);
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
    map.classList.remove('map--faded');
    form.form.classList.remove('ad-form--disabled');

    form.elementList.forEach(function (element) {
      element.disabled = false;
    });

    form.address.value = Math.floor(pinMain.offsetLeft + 0.5 * PIN_MAIN_WIDTH) + ', ' + Math.floor(pinMain.offsetTop + PIN_MAIN_ACTIVE_HEIGHT);
    form.rooms.value = '1';
    form.rooms.selectedIndex = 0;
    form.guests.value = '1';
    form.guests.selectedIndex = 2;

    /**
     * Обработчик успешной загрузки данных с сервера
     * @param {Object} data Данные объявлений, полученные с сервера
     */
    var successHandler = function (data) {
      advertsData = data;
      window.renderPins(advertsData);
      // map.insertBefore(window.renderCard(advertsData[0]), map.querySelector('.map__filters-container'));

      filterList.forEach(function (filter) {
        filter.disabled = false;
      });
    };

    /**
     * Обработчик ошибки, произошедшей при получении данных с сервера
     * @param {string} errorMessage Текст сообщения
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

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_BUTTON) {
      onActiveMode();
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onActiveMode();
    }
  });

  houseTypeField.addEventListener('change', function () {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)'); // метки с похожими объявлениями на карте

    pins.forEach(function (pin) {
      pin.remove();
    });

    var advertsSameHouseType = advertsData.filter(function (advert) {
      return advert.offer.type === houseTypeField.value;
    });

    if (advertsSameHouseType !== []) {
      window.renderPins(advertsSameHouseType);
    }

    if (houseTypeField.value === 'any') {
      window.renderPins(advertsData);
    }
  });
})();
