import getURL from './getURL'

export default function request (method, path, body, filter) {
  method = method.toUpperCase()
  if (method === 'GET') {
    body = undefined
  } else {
    body = body && JSON.stringify(body)
  }
  return fetch(getURL(path, filter), {
    method,
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'text/plain',
      'Accept': 'application/json'
      // 'X-BLACKCAT-TOKEN': window.sessionStorage.getItem('access_token') || ''
    },
    body
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      return res.json()
    }
    if (res.status === 401) {
      return Promise.reject(new Error('Unauthorized'))
    }
    const error = new Error(res.statusText)
    error.response = res
    return Promise.reject(error)
  }).then(res => {
    if (res.token) {
      window.sessionStorage.setItem('access_token', res.token) // 保存token
    }
    if (res.err) {
      return Promise.reject(res.err)
    }
    return res
  })
}

export const get = (url, filter) => request('GET', url, null, filter)
export const post = (url, body) => request('POST', url, body)
export const put = (url, body) => request('PUT', url, body)
export const del = (url, body) => request('DELETE', url, body)
