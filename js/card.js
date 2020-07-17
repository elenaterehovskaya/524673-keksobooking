'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * Создаёт карточку объявления и заполняет её данными
   * @param {Object} cardData Объект с данными объявлений
   * @return {Node} cardElement DOM-элемент, соответствующий карточке объявления
   */
  var cardCreate = function (cardData) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';

    switch (cardData.offer.type) {
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }

    if (cardData.offer.rooms === 0 || cardData.offer.rooms === 0) {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (cardData.offer.rooms === 1) {
      if (cardData.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комната для ' + cardData.offer.guests + ' гостя';
      }
      if (cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комната для ' + cardData.offer.guests + ' гостей';
      }
    }

    if (cardData.offer.rooms >= 2 && cardData.offer.rooms <= 4) {
      if (cardData.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостя';
      }
      if (cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
      }
    }

    if (cardData.offer.rooms >= 5 && cardData.offer.rooms < 100) {
      if (cardData.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостя';
      }
      if (cardData.offer.guests >= 2 && cardData.offer.guests < 100) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
      }
    }

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    var featureList = cardElement.querySelector('.popup__features').querySelectorAll('.popup__feature');

    featureList.forEach(function (feature) {
      feature.style = 'display: none';
    });

    for (var i = 0; i < cardData.offer.features.length; i++) {
      if (cardData.offer.features[i] === 'wifi') {
        cardElement.querySelector('.popup__feature--wifi').style = '';
      }
      if (cardData.offer.features[i] === 'dishwasher') {
        cardElement.querySelector('.popup__feature--dishwasher').style = '';
      }
      if (cardData.offer.features[i] === 'parking') {
        cardElement.querySelector('.popup__feature--parking').style = '';
      }
      if (cardData.offer.features[i] === 'washer') {
        cardElement.querySelector('.popup__feature--washer').style = '';
      }
      if (cardData.offer.features[i] === 'elevator') {
        cardElement.querySelector('.popup__feature--elevator').style = '';
      }
      if (cardData.offer.features[i] === 'conditioner') {
        cardElement.querySelector('.popup__feature--conditioner').style = '';
      }
    }

    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;

    if (cardData.offer.photos.length !== 0) {
      cardElement.querySelector('.popup__photos').querySelector('img').src = cardData.offer.photos[0];

      for (var j = 1; j < cardData.offer.photos.length; j++) {
        var newPhoto = document.createElement('img');
        newPhoto.className = 'popup__photo';
        newPhoto.src = cardData.offer.photos[j];
        newPhoto.width = 45;
        newPhoto.height = 40;
        newPhoto.alt = 'Фотография жилья' + j;
        cardElement.querySelector('.popup__photos').append(newPhoto);
      }
    } else {
      cardElement.querySelector('.popup__photos').remove();
    }

    return cardElement;
  };

  /**
   * Отрисовывает созданную карточку объявления
   * @param {Array} data Массив с данными объявлений
   */
  var cardRender = function (data) {
    map.insertBefore(cardCreate(data), map.querySelector('.map__filters-container'));
  };

  /**
   * Удаляет созданную карточку объявления
   * @param {Element} pin DOM-элемент, соответствующий метке на карте
   * @param {Element} card Карточка объявления
   * @param {Element} cardClose Кнопка закрытия
   */
  var cardRemove = function (pin, card, cardClose) {
    cardClose.addEventListener('click', function () {
      pin.classList.remove('map__pin--active');
      card.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        pin.classList.remove('map__pin--active');
        card.remove();
      }
    });
  };

  window.card = {
    /**
     * Открывает созданную карточку объявления на карте
     * @param {Array} data Массив с данными объявлений
     * @param {Element} pin DOM-элемент, соответствующий метке на карте
     */
    open: function (data, pin) {
      pin.addEventListener('click', function () {
        pin.classList.add('map__pin--active');
        cardRender(data);

        var card = map.querySelector('.map__card');
        var cardClose = map.querySelector('.popup__close');

        cardRemove(pin, card, cardClose);
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          pin.classList.add('map__pin--active');
          cardRender(data);

          var card = map.querySelector('.map__card');
          var button = map.querySelector('.popup__close');

          cardRemove(pin, card, button);
        }
      });
    }
  };
})();
