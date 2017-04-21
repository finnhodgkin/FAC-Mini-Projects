const fetch = (url, method, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const contentType = xhr.getResponseHeader('content-type');
      if (xhr.status === 200 && contentType.indexOf('json' > -1)) {
        cb(null, JSON.parse(xhr.responseText))
      } else {
        cb(new Error('Error getting data from the server'))
      }
    }
  }
  xhr.open(method, url, true);
  xhr.send();
};

export const getNames = (callback) => fetch('/names', 'GET', callback)

export const addNameToDb = (name, cb) => fetch('/add/' + name, 'POST', cb)

export const removeFromDb = (id, cb) => fetch('/delete/' + id, 'DELETE', cb)

export const setAllPop = (isOn, cb) => fetch('/all-pop/' + isOn, 'PUT', cb)

export const checkId = (id, isOn, cb) => fetch(`/check/${id}/${isOn}`, 'PUT', cb)

export const setName = (name) => fetch('/set/' + name, 'PUT', () => {})
