'use strict';

(function () {
  var form = document.querySelector('.ad-form'); // форма подачи заявления
  var elementList = form.querySelectorAll('fieldset'); // список элементов формы подачи заявления
  var address = form.querySelector('#address'); // поле адреса
  var rooms = form.querySelector('#room_number'); // поле количества комнат
  var guests = form.querySelector('#capacity'); // поле количества гостей (спальных мест)
  var numRooms = rooms.querySelectorAll('option'); // число выбранных комнат
  var numGuests = guests.querySelectorAll('option'); // число выбранных гостей

  /**
   * Проверяет соответствие количества гостей (спальных мест) с количеством комнат
   * @param {number} userRooms число комнат, выбранных пользователем
   */
  var checkGuests = function (userRooms) {
    var userGuests = parseInt(guests.value, 10);
    guests.setCustomValidity('');
    if (userRooms === 1) {
      if (userGuests !== 1) {
        guests.setCustomValidity('Число гостей в одной комнате может быть только 1');
      }
    }
    if (userRooms === 2) {
      if (userGuests !== 1 && userGuests !== 2) {
        guests.setCustomValidity('Число гостей в двух комнатах может быть 2 или 1');
      }
    }
    if (userRooms === 3) {
      if (userGuests !== 1 && userGuests !== 2 && userGuests !== 3) {
        guests.setCustomValidity('Число гостей в трёх комнатах может быть 3, 2 или 1');
      }
    }
    if (userRooms === 100) {
      if (userGuests !== 0) {
        guests.setCustomValidity('100 комнат — не для гостей');
      }
    }
  };

  guests.addEventListener('change', function () {
    checkGuests(parseInt(rooms.value, 10));
  });

  rooms.addEventListener('change', function () {
    checkGuests(parseInt(rooms.value, 10));
  });
  window.form = {
    form: form,
    elementList: elementList,
    address: address,
    numRooms: numRooms,
    numGuests: numGuests
  };
})();
