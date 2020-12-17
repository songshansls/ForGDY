const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
const corsOptions = {
  origin: 'http://172.16.52.248',
  credentials: true
}

app.use(cors(corsOptions))

const DUST_SERVER = 'http://dust.0531yun.cn'
const dustRequest = async ({ url, method = 'GET', params, data, headers }) => {
  const options = {
    url: DUST_SERVER + url,
    method,
    data,
    params,
    headers
  }
  try{
    console.log('[Dust Request]:', options)
    const response = await axios(options)
    // console.log('[Dust Response]:', response)
    return response.data
  } catch(err) {
    console.log('[Dust Error]:', err)
  }
}
app.get('/node/getTokenByAcc', async (req, res) => {
  const url = '/api/getTokenByAcc'
  const params = req.query
  const response = await dustRequest({ url, params })
  console.log('?????', response)
  res.send(response)
})
app.get('/node/getRealtimeData', async (req, res) => {
  const url = '/api/data/getRealtimeData'
  const params = req.query
  const headers = req.headers
  const response = await dustRequest({ url, params, headers })
  console.log('?????', response)
  res.send(response)
})
app.get('/node/hello', (req, res) => {
  console.log('get!!!')
  res.send(['hello world'])
})

app.listen(port, () => {
  console.log('Server started')
})
