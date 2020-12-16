import fetch from 'helpers/fetch'

export const fetchToken = async ({ callback }) => {
  const url = 'http://localhost:5000/node/getTokenByAcc'
  const params = {
    loginName: 'c201031zyjc',
    password: 'c201031zyjc'
  }
  const { data } = await fetch({
    url,
    params
  })
  callback(data)
  return data
}

export const fetchRealTimeData = async ({ token, callback }) => {
  const url = 'http://localhost:5000/node/getRealtimeData'
  const params = {
    deviceIds: '40098450'
  }
  const headers = {
    token
  }
  const { data } = await fetch({
    url,
    params,
    headers
  })
  // console.log('response', response)
  callback(data[0])
  return data[0]
}

export const fetchNodeTest = async () => {
  const url = 'http://localhost:5000/node/hello'
  const response = await fetch({
    url
  })
  console.log('response', response)
}
