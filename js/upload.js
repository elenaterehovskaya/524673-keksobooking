'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  /**
   * Отправляет данные формы на сервер при помощи объекта для работы с HTTP-запросами XMLHttpRequest
   * @param {Object} data Объект с данными формы, которые необходимо отправить на сервер
   * @param {function} successHandler Обработчик успешной отправки данных на сервер
   * @param {function} errorHandler Обработчик ошибки, произошедшей при отправки данных на сервер
   */
  window.upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler();
      } else {
        errorHandler();
      }
    });

    xhr.open('POST', URL); // как и куда мы хотим обратиться: тип POST (отправить), URL (куда отправить данные)
    xhr.send(data); // чтобы отправить запрос, его надо запустить send()
  };
})();
