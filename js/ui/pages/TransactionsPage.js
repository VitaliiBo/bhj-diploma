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
      let accountId = { id: document.querySelector('.account.active').dataset['id'] };
      Account.remove( accountId , {} , (response) => {
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
      Transaction.remove( { id: id }, {} , (response) => {
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
        console.log(response);
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
    this.renderTransactions([]);
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
    let d = new Date( date );

    return  `${d.toLocaleString('ru', { day: "numeric", month: "long", year: "numeric" })} в ${d.toLocaleString('ru', {hour: "numeric", minute: "numeric" })}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    console.log(item);
    let transaction = '';
    if (item.type === 'income') {
      transaction = 'transaction_income';
    } else {
      transaction = 'transaction_expense';
    }
    let date = this.formatDate(item.updated_at);
    return `<div class="transaction ${transaction} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          <!--  сумма -->
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <!-- в data-id нужно поместить id -->
            <button class="btn btn-danger transaction__remove" data-id="${item.account_id}">
                <i class="fa fa-trash"></i>
            </button>
        </div>
      </div>`;

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    console.log(data);
    data.forEach( item => {

      this.element.querySelector('.content').insertAdjacentHTML('beforeEnd', this.getTransactionHTML(item));
    } )
  }
}
