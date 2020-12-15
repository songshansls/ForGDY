import server from 'constants/server'

export default (path, filter) =>
  filter
    ? server + path + '?' + Object.entries(filter)
      .map(item => item.join('='))
      .join('&')
    : server + path
