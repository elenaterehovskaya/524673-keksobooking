'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    /**
     * Создаёт метку на карте и заполняет её данными из объекта
     * @param {Array} pinData объекта с данными
     * @return {Node} pinElement DOM-элемент на основе JS-объекта
     */
    renderPin: function (pinData) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = pinData.location.x + 0.5 * window.map.PIN_WIDTH + 'px';
      pinElement.style.top = pinData.location.y + window.map.PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = pinData.author.avatar;
      pinElement.querySelector('img').alt = pinData.offer.title;
      return pinElement;
    }
  };
})();
