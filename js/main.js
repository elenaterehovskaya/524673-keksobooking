'use strict';

(function () {
  var LEFT_BUTTON = 0;
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_HEIGHT_ACTIVE = 87;

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main'); // метка, являющаяся контролом указания адреса объявления
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
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
    form.type.value = 'flat';
    form.type.selectedIndex = 1;
    form.price.placeholder = '5000';
    form.rooms.value = '1';
    form.rooms.selectedIndex = 0;
    form.guests.value = '3';
    form.guests.selectedIndex = 0;
  };

  offActiveMode();

  /**
   * Обработчик успешной загрузки данных с сервера
   * @param {Array} data Массив с данными объявлений, полученный с сервера
   */
  var successHandler = function (data) {
    advertsData = data;
    window.pin.render(advertsData);

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

  /**
 * Включает активный режим, страница находится в активном состоянии: включены форма и карта
 */
  var onActiveMode = function () {
    map.classList.remove('map--faded');
    form.form.classList.remove('ad-form--disabled');

    form.elementList.forEach(function (element) {
      element.disabled = false;
    });

    form.address.value = Math.floor(pinMain.offsetLeft + 0.5 * PIN_MAIN_WIDTH) + ', ' + Math.floor(pinMain.offsetTop + PIN_MAIN_HEIGHT_ACTIVE);
    form.type.value = 'flat';
    form.type.selectedIndex = 1;
    form.price.placeholder = '1000';
    form.price.min = 1000;
    form.rooms.value = '1';
    form.rooms.selectedIndex = 0;
    form.guests.value = '1';
    form.guests.selectedIndex = 2;

    // Получает данные с сервера при помощи объекта для работы с HTTP-запросами XMLHttpRequest
    window.load(successHandler, errorHandler);
  };

  /**
   * Обработчик нажатия левой кнопки мыши
   * @param {Object} evt Объект, описывающий событие, кот. произошло
   */
  var firstClickHandler = function (evt) {
    if (evt.button === LEFT_BUTTON) {
      onActiveMode();
      pinMain.removeEventListener('mousedown', firstClickHandler);
      pinMain.removeEventListener('keydown', firstEnterHandler);
    }
  };

  /**
   * Обработчик нажатия клавиши Enter
   * @param {Object} evt Объект, описывающий событие, кот. произошло
   */
  var firstEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      onActiveMode();
      pinMain.removeEventListener('keydown', firstEnterHandler);
      pinMain.removeEventListener('mousedown', firstClickHandler);
    }
  };

  pinMain.addEventListener('mousedown', firstClickHandler);

  pinMain.addEventListener('keydown', firstEnterHandler);

  // Фильтры
  houseTypeField.addEventListener('change', function () {
    pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });

    if (houseTypeField.value !== 'any') {
      var advertsSameHouseType = advertsData.filter(function (advert) {
        return advert.offer.type === houseTypeField.value;
      });

      if (advertsSameHouseType.length !== 0) {
        window.pin.render(advertsSameHouseType);
      }
    } else {
      window.pin.render(advertsData);
    }
  });
})();
