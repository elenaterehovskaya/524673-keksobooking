'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  /**
   * Создаёт карточку объявления и заполняет её данными из объекта
   * @param {Array} cardData объекта с данными
   * @return {Node} cardElement DOM-элемент на основе JS-объекта
   */
  var renderCard = function (cardData) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    switch (cardData.offer.type) {
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }
    if (cardData.offer.rooms === 1) {
      if (cardData.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комната для ' + cardData.offer.guests + ' гостя';
      }
      if (cardData.offer.guests === 0 && cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
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

    if (cardData.offer.rooms >= 5 && cardData.offer.rooms <= 10) {
      if (cardData.offer.guests === 1) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостя';
      }
      if (cardData.offer.guests >= 2 && cardData.offer.guests <= 10) {
        cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
      }
    }

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    var listFeatures = cardElement.querySelector('.popup__features').querySelectorAll('li');

    for (var i = cardData.offer.features.length; i < listFeatures.length; i++) {
      listFeatures[i].style = 'display: none';
    }

    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
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
    return cardElement;
  };

  window.map.map.insertBefore(renderCard(window.data.advertsData[0]), window.map.map.querySelector('.map__filters-container'));
})();
