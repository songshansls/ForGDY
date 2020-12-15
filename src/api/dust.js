import fetch from 'helpers/fetch'

export const fetchToken = async ({ callback }) => {
  const resource = 'api/getTokenByAcc'
  const params = {
    loginName: 'c201031zyjc',
    password: 'c201031zyjc'
  }
  const { data } = await fetch({
    resource,
    params
  })
  callback(data)
  return data
}

export const fetchRealTimeData = async ({ token, callback }) => {
  const resource = 'api/data/getRealtimeData'
  const params = {
    deviceIds: '40098450'
  }
  const headers = {
    token
  }
  const { data } = await fetch({
    resource,
    params,
    headers
  })
  // console.log('response', response)
  callback(data[0])
  return data[0]

}
