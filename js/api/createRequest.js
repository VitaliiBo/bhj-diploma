/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  if (options.data) {
    xhr.open( options.method , `${options.url}?mail=${options.data.username}&password=${options.data.password}` );
  } else {
    xhr.open( options.method , options.url );
  }
  xhr.responseType = options.responseType;
  //xhr.withCredentials = true;
  if (options.headers) {
    for( header in options.headers ) {
      xhr.setRequestHeader(header , options.headers[header]);
    }
  }
  if (options.method === 'GET') {
    xhr.send();
  } else {
    let formData = new FormData();
    for( data in options.data ){
      formData.append( data , options.data[data] )
    }
    xhr.send( formData );
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status == 200) {
      console.log(xhr.response);
      return xhr.response;
    }
    if (xhr.readyState === 4 && xhr.status != 200) {
      return xhr.response;
      console.log(xhr.statusText);
    }
  }
};
