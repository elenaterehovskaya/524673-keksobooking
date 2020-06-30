'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_SIMILAR_PIN_COUNT = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins'); // блок с метками похожих объявлений на карте

  /**
   * Создаёт метку на карте и заполняет её данными
   * @param {Array} pinData Объект с данными
   * @return {Node} pinElement DOM-элемент на основе JS-объекта
   */
  var createPin = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pinData.location.x - 0.5 * PIN_WIDTH + 'px';
    pinElement.style.top = pinData.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
    return pinElement;
  };

  window.renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    var pinCount = data.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : data.length;

    for (var i = 0; i < pinCount; i++) {
      if (data.offer !== '') {
        fragment.appendChild(createPin(data[i]));
      }
    }

    pinList.appendChild(fragment);
  };
})();
