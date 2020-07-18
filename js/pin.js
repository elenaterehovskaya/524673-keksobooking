'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COUNT_MAX_SIMILAR = 5;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins'); // блок с метками похожих объявлений на карте

  /**
   * Создаёт метку объявления и заполняет её данными
   * @param {Object} data Объект с данными объявлений
   * @return {Node} pinElement DOM-элемент, соответствующий метке на карте
   */
  var pinCreate = function (data) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = data.location.x - 0.5 * PIN_WIDTH + 'px';
    pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      var pinElementActive = document.querySelector('.map__pin--active');
      var card = document.querySelector('.map__card');
      var button = document.querySelector('.popup__close');

      if (pinElementActive) {
        pinElementActive.classList.remove('map__pin--active');
      }

      if (card) {
        card.remove();
      }

      pinElement.classList.add('map__pin--active');
      window.card.show(data);

      button.addEventListener('click', function () {
        pinElement.classList.remove('map__pin--active');
        card.remove();
      });
    });

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
