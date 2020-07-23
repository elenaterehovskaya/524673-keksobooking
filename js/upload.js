'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';

  /**
   * Отправляет данные формы на сервер при помощи объекта для работы с HTTP-запросами XMLHttpRequest
   * @param {Object} data Объект с данными формы, которые необходимо отправить на сервер
   * @param {function} uploadHandler Обработчик отправки данных на сервер
   */
  window.upload = function (data, uploadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // специальный обработчик события load, который сработает тогда, когда сервер вернёт ответ
    xhr.addEventListener('load', function () {
      uploadHandler(xhr.response); // текст ответа, результат в поле xhr.response
    });

    xhr.open('POST', URL); // как и куда мы хотим обратиться: тип POST (отправить), URL (куда отправить данные)
    xhr.send(data); // чтобы отправить запрос, его надо запустить send()
  };
})();
