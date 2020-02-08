/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {

  static HOST = 'https://bhj-diplom.letsdocode.ru';
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback ) {
    createRequest({
      url: this.HOST + this.URL,
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: (err , response) => callback(response)
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback ) {
    let modifiedData = Object.assign({ _method: 'PUT' }, data );
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'POST',
      callback: (err , response) => callback(response)
    })
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id , data, callback = f => f ) {
    console.log(id);
    let modifiedData = data;
    modifiedData.id = id; //Object.assign({ id: id }, data );
    console.log(modifiedData);
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'GET',
      callback: (err , response) => callback(response)
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id , data, callback = f => f ) {
    let modifiedData = Object.assign({ id: id, _method: 'DELETE' }, data );
    createRequest({
      url: this.HOST + this.URL,
      data: modifiedData,
      responseType: 'json',
      method: 'POST',
      callback: (err , response) => callback(response)
    })
  }
}
