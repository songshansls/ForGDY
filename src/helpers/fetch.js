import fetch from 'isomorphic-fetch'
import SERVER from 'constants/server'
import Cookies from 'js-cookie'

const DEFAULT_SERVER = process.env.NODE_ENV === 'production' ? SERVER : 'localhost:4321'
export const myFetch = ({
  url,
  ssl = false,
  server = DEFAULT_SERVER,
  // version = '',
  resource,
  subResource,
  headers,
  suffix,
  id,
  method = 'GET',
  credentials = 'include',
  extension,
  params = {},
  payload,
  cleaner = body => body
}) => {
  params = {
    ...params,
    origin: window.origin
  }
  let uri = `http${ssl ? 's' : ''}://${server}/${resource}`
  uri += id ? `/${id}` : ''
  uri += subResource ? `/${subResource}` : ''
  uri += suffix ? `/${suffix}` : ''
  uri += extension ? `.${extension}` : '/'
  uri = url || uri
  uri += '?' + Object.entries(params).filter(([ key, value ]) => value).map(([ key, value ]) => `${key}=${encodeURIComponent(value)}`).join('&&')
  
  // params = {
  //   ...params,
  //   SPC_CDS: Cookies.get('SPC_CDS'),
  //   SPC_CDS_VER: 2
  // }
  console.log('server', server)
  let total = 0
  let perPage = 0
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method,
      credentials,
      body: payload,
      headers,
    }).then(response => {
      total = parseInt(response.headers.get('total'))
      perPage = parseInt(response.headers.get('per-page'))
      return response.json()
    }).then(body => {
      resolve(
        body instanceof Array
          ? {
            total,
            perPage,
            [resource]: body.map(cleaner)
          }
          : cleaner(body)
      )
    })
  })
}

export default myFetch
