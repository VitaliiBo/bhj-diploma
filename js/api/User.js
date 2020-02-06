/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static HOST = 'https://bhj-diplom.letsdocode.ru';
  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem( 'user' , JSON.stringify(user) );
  }

  /* *
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return undefined;
      }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    console.log(data);
    createRequest({
      url: this.HOST + this.URL + '/current',
      data: data,
      responseType: 'json',
      method: 'GET',
      callback: (err , response) => {
          if (response.success === true){
            console.log('fetch true');
            console.log(response);
            User.setCurrent(response.user)
            App.setState( 'user-logged' );
            // User.setCurrent(response.user)
            return response;
          } else if (response.success === false) {
            console.log(response);
            console.log('fetch false');
            User.unsetCurrent();
            App.setState( 'init' );
            // User.unsetCurrent()
            // return response;
          }
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response.success === true) {
          console.log(response);
          User.setCurrent(response.user);
          App.setState( 'user-logged' );
          App.modals.login.element.querySelector('form').reset();
          App.modals.login.element.style.display = null;
        }
      }
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err , response) => {
        console.log(response);
        if (response.success === true) {
          console.log(this);
          User.setCurrent(response.user);
          App.setState( 'user-logged' );
          App.modals.register.element.querySelector('form').reset();
          App.modals.register.element.style.display = null;
        }
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    createRequest({
      url: this.HOST + this.URL +'/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err , response) => {
        if (response.success === true) {
          User.unsetCurrent();
          App.setState('init');
        }
      }
    })
  }
}
