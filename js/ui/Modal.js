/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (this.element != undefined) {
      this.registerEvents();
      // console.log(this);
    } else {
      console.log('Ошибка');
      alert('Ошибка');
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    this.onClose = this.onClose.bind( this );
    this.element.querySelectorAll('[data-dismiss="modal"]')
    .forEach(item => item.addEventListener('click' , this.onClose ))

  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose( e ) {
    e.preventDefault();

    this.close();
    // this.unregisterEvents();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    this.element.querySelectorAll('[data-dismiss="modal"]')
    .forEach(item => item.removeEventListener('click' , this.onClose ))
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    console.log(this);
    this.element.style.display = null;
  }
}
