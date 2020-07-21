'use strict';

(function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = null;
  var button = null;

  /**
   * Создаёт карточку объявления и заполняет её данными
   * @param {Object} data Объект с данными объявления
   * @return {Node} cardElement DOM-элемент, соответствующий карточке объявления
   */
  var cardCreate = function (data) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';

    switch (data.offer.type) {
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

    if (data.offer.rooms === 0 || data.offer.rooms === 0) {
      cardElement.querySelector('.popup__text--capacity').remove();
    }

    if (data.offer.rooms === 1) {
      if (data.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комната для ' + data.offer.guests + ' гостя';
      }
      if (data.offer.guests >= 2 && data.offer.guests <= 10) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комната для ' + data.offer.guests + ' гостей';
      }
    }

    if (data.offer.rooms >= 2 && data.offer.rooms <= 4) {
      if (data.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостя';
      }
      if (data.offer.guests >= 2 && data.offer.guests <= 10) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      }
    }

    if (data.offer.rooms >= 5 && data.offer.rooms < 100) {
      if (data.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостя';
      }
      if (data.offer.guests >= 2 && data.offer.guests < 100) {
        cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
      }
    }

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featureList = cardElement.querySelector('.popup__features').querySelectorAll('.popup__feature');

    featureList.forEach(function (feature) {
      feature.style = 'display: none';
    });

    for (var i = 0; i < data.offer.features.length; i++) {
      if (data.offer.features[i] === 'wifi') {
        cardElement.querySelector('.popup__feature--wifi').style = '';
      }
      if (data.offer.features[i] === 'dishwasher') {
        cardElement.querySelector('.popup__feature--dishwasher').style = '';
      }
      if (data.offer.features[i] === 'parking') {
        cardElement.querySelector('.popup__feature--parking').style = '';
      }
      if (data.offer.features[i] === 'washer') {
        cardElement.querySelector('.popup__feature--washer').style = '';
      }
      if (data.offer.features[i] === 'elevator') {
        cardElement.querySelector('.popup__feature--elevator').style = '';
      }
      if (data.offer.features[i] === 'conditioner') {
        cardElement.querySelector('.popup__feature--conditioner').style = '';
      }
    }

    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    if (data.offer.photos.length !== 0) {
      cardElement.querySelector('.popup__photos').querySelector('img').src = data.offer.photos[0];

      for (var j = 1; j < data.offer.photos.length; j++) {
        var newPhoto = document.createElement('img');
        newPhoto.className = 'popup__photo';
        newPhoto.src = data.offer.photos[j];
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
   * Обработчик события нажатия клавиши Esc при открытой карточке объявления
   * @param {Object} evt Объект, описывающий событие, кот. произошло
   */
  var cardEscHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.close();
    }
  };

  window.card = {
    /**
     * Показывает созданную карточку объявления
     * @param {Object} data Массив с данными объявлений
     */
    show: function (data) {
      map.insertBefore(cardCreate(data), map.querySelector('.map__filters-container'));

      card = map.querySelector('.map__card');
      button = map.querySelector('.popup__close');

      button.addEventListener('click', function () {
        window.card.close();
      });

      document.addEventListener('keydown', cardEscHandler);
    },

    /**
     * Закрывает созданную карточку объявления
     */
    close: function () {
      var pin = map.querySelector('.map__pin--active');

      pin.classList.remove('map__pin--active');
      card.remove();

      document.removeEventListener('keydown', cardEscHandler);
    }
  };
})();
