/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list( User.current(), (response) => {
      this.element.querySelector('select').innerHTML = '';
      response.data.forEach( item => {
        this.element.querySelector('select').insertAdjacentHTML('beforeEnd',`
        <option value="${item.id}">${item.name}: ${item.sum}</option>
        `)
      } )
    } )
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create( options , (response) => {
      this.element.reset();
      App.update();
      this.element.closest('.modal').style.display = '';
    } )
  }
}
