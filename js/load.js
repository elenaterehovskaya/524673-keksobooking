'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000; // 10s
  var StatusCode = {
    OK: 200
  };

  /**
   * Получает данные с сервера при помощи объекта для работы с HTTP-запросами XMLHttpRequest
   * @param {function} successHandler Обработчик успешной загрузки данных с сервера
   * @param {function} errorHandler Обработчик ошибки, произошедшей при получении данных с сервера
   */
  window.load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    // специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        successHandler(xhr.response); // текст ответа, результат в поле xhr.response
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL); // как и куда мы хотим обратиться: тип GET (получить), URL (адрес откуда получить данные)
    xhr.send(); // чтобы отправить запрос, его надо запустить send()
  };
})();
