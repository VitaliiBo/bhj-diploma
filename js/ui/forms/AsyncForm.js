/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    if (this.element != null) {
      this.registerEvents();
    } else {
      console.log('ОШИБКА AsyncForm');
    }
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.onsubmit = (e) => {
      e.preventDefault();
      this.submit();
    }
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let formData = new FormData(this.element);
    // formData.append( this.element.name.name , this.element.name.value );
    // formData.append( this.element.email.name , this.element.email.value );
    // formData.append( this.element.password.name , this.element.password.value );
    for (let key of formData.entries()) {
      formData[key[0]] = key[1];
    }
    return formData;
  }

  onSubmit( options ) {
    console.log(options);
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.onSubmit(
      this.getData()
    )
  }
}
