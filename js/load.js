'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000; // 10s
  var StatusCode = {
    OK: 200
  };

  /**
   * Получает данные с сервера при помощи объекта для работы с HTTP-запросами XMLHttpRequest
   * @param {function} onSuccess обработчик успешной загрузки данных с сервера
   * @param {function} onError обработчик ошибки, произошедшей при получении данных с сервера
   */
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    // специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL); // как и куда мы хотим обратиться: тип GET (получить), URL (адрес откуда получить данные)
    xhr.send(); // чтобы отправить запрос, его надо запустить send()
  };
})();
