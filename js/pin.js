'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COUNT_MAX_SIMILAR = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins'); // блок с метками похожих объявлений на карте
  var pinActive = null;

  /**
   * Создаёт метку объявления и заполняет её данными
   * @param {Object} data Объект с данными объявления
   * @return {Node} pinElement DOM-элемент, соответствующий метке на карте
   */
  var createPin = function (data) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = data.location.x - 0.5 * PIN_WIDTH + 'px';
    pin.style.top = data.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = data.author.avatar;
    pin.querySelector('img').alt = data.offer.title;

    pin.addEventListener('click', function () {
      var card = document.querySelector('.map__card');

      if (card) {
        window.card.close();
      }

      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }

      pin.classList.add('map__pin--active');
      window.card.show(data);
      pinActive = pin;
    });

    return pin;
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
          fragment.appendChild(createPin(data[i]));
        }
      }

      pinList.appendChild(fragment);
    }
  };
})();
