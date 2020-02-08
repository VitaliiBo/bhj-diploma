/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (element != null) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      console.log('Ошибка constructor AccountsWidget element === null');
    }

  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    document.querySelector('.create-account').onclick = () => {
      App.getModal('createAccount').element.style.display = 'block';
    }
    this.onSelectAccount = this.onSelectAccount.bind( this );
    this.element.querySelectorAll('.account').forEach(item => item.onclick = (e) => {
      e.preventDefault();
      console.log(this);
      this.onSelectAccount(this);
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current != null) {
      Account.list(User.current() , (item) => {
        this.clear();
        item.data.forEach( key => this.renderItem(key) )
      });
    } else {
      console.log(this , 'ERROR');
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.element.querySelectorAll('.account').forEach(item => item.outerHTML = '');
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let accounts = this.element.querySelectorAll('.account');
    accounts.forEach(item => item.forEach(item => item.classList.remove('active')));
      element.classList.add('active');

  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {

  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    item.forEach( key => {
      App.widgets.acconts.element.insertAdjacentHTML('beforeEnd' , `
      <li class="account">
          <a href="#">
              <span>QIWI</span> /
              <span>20.31 ₽</span>
          </a>
      </li>
      `)
    })
  }
}
