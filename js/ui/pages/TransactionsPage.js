/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (element != undefined) {
      this.element = element;
      this.registerEvents();
    } else {
      console.log('TransactionsPage element null');
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
      this.render();
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    document.querySelector('.remove-account').addEventListener('click' , (e) => {
      e.preventDefault();
      this.removeAccount();
    });
    document.querySelectorAll('.transaction__remove').forEach( item => item.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeTransaction(item['data-id']);
    }))
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (confirm(`Вы действительно хотите удалить счёт ?`)) {
      let accountId = { account_id: document.querySelector('.account.active').dataset['id'] };
      Account.remove( accountId , User.current() , (response) => {
        if (response.success === true) {
          App.update();
          this.clear();
        }
      } );
    } else {

    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm(`Вы действительно хотите удалить транзакцию ?`)) {
      Transaction.remove( id, User.current() , (response) => {
        if (response.success === true) {
          App.update();
          this.clear();
        }
      } );
    } else {

    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (options != undefined) {
      console.log( options );
      Account.get( options , User.current(), (response) => {
        console.log(response);
        for( let key in response.data){
          if(response.data[key].id === options.account_id){
            this.renderTitle(response.data[key].name);
          } else {
            console.log(key);
          }
        }
      } );
      Transaction.list( options, (response) => {
        this.renderTransactions( response.data );
      } )
    }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    TransactionsPage.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    document.querySelector('.content-title').innerHTML = name ;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {

  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {

  }
}
