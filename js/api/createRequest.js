/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  // console.log(options.data);
  let modifiedData = options.data;
  for( data in options.data ){
    if ( data === 'email'){
      modifiedData = Object.assign({ mail: options.data[data] }, options.data);
    }
  }
  if (options.data && options.method === 'GET') {

    let userData = '';
    for ( let key in options.data ){
      if(key == 'id' || key == 'email' || key == 'name' ){
        if (userData.length < 1) {
          userData += `${key}=${options.data[key]}`
        } else {
          userData += `&${key}=${options.data[key]}`
        }
      }
    }

    xhr.open( options.method , `${options.url}?+${userData}` );
  } else {
    xhr.open( options.method , options.url );
  }
  xhr.responseType = options.responseType;
  xhr.withCredentials = true;
  if (options.headers) {
    for( header in options.headers ) {
      xhr.setRequestHeader(header , options.headers[header]);
    }
  }
  if (options.method === 'GET') {
    xhr.send();
  } else {
    let formData = new FormData();
    for( key in modifiedData ) {
      formData.append( key , modifiedData[key])
    }
    // xhr.send( options.data )
    // xhr.send( modifiedData );
    console.log(xhr);
    xhr.send( formData );

  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status == 200) {
      console.log(xhr.response);
      // return xhr.response;
      options.callback( null , xhr.response );
    }
    if (xhr.readyState === 4 && xhr.status != 200) {
      // return xhr.response;
      console.log(xhr.status);
      options.callback( xhr.response );
    }
  }
};
