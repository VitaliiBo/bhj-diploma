/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {
  constructor() {
    this.URL = '';
    this.HOST = 'https://bhj-diplom.letsdocode.ru';
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback ) {
    createRequest({
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: callback
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let modifiedData = Object.assign({ _method: 'PUT' }, data );
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'POST',
      callback: callback
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ id: id }, data );
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'GET',
      callback: callback
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let modifiedData = Object.assign({ id: id, _method: 'DELETE' }, data );
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'POST',
      callback: callback
    })
  }
}
