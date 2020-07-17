'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COUNT_MAX_SIMILAR = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins'); // блок с метками похожих объявлений на карте

  /**
   * Создаёт метку объявления и заполняет её данными
   * @param {Object} pinData Объект с данными объявлений
   * @return {Element} pinElement DOM-элемент, соответствующий метке на карте
   */
  var pinCreate = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pinData.location.x - 0.5 * PIN_WIDTH + 'px';
    pinElement.style.top = pinData.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
    return pinElement;
  };

  window.pin = {
    /**
     * Отрисовывает созданные метки на карте в заданном количестве
     * @param {Array} data Массив с данными объявлений
     */
    render: function (data) {
      var fragment = document.createDocumentFragment();
      var pinCount = data.length > PIN_COUNT_MAX_SIMILAR ? PIN_COUNT_MAX_SIMILAR : data.length;

      for (var i = 0; i < pinCount; i++) {
        if (data.offer !== '') {
          fragment.appendChild(pinCreate(data[i]));
        }
      }

      pinList.appendChild(fragment);
    }
  };
})();
