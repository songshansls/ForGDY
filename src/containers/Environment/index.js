import React, { useEffect, useState } from 'react'
import styles from './style.css'
import { Typography } from 'antd'
import humidityIcon from 'assets/img/hum.png'
import wind8Icon from 'assets/img/wd8.png'
import particleIcon from 'assets/img/tsp.png'
import noiseIcon from 'assets/img/noise.png'
import windPowerIcon from 'assets/img/wp.png'
import atmIcon from 'assets/img/atm.png'
import windSpeedIcon from 'assets/img/ws.png'
import temperatureIcon from 'assets/img/tem.png'
import pm10Icon from 'assets/img/pm10.png'
import pm25Icon from 'assets/img/pm25.png'
import windDirectionIcon from 'assets/img/wd360.png'
import DataItem from 'components/DataItem'
import { fetchToken, fetchRealTimeData, fetchNodeTest } from 'api/dust'

const list = [
  {
    key: 'hum',
    icon: humidityIcon,
    label: '湿度'
  }, {
    key: 'wd8',
    icon: wind8Icon,
    label: '八风向'
  }, {
    key: 'tsp',
    icon: particleIcon,
    label: '悬浮微粒'
  }, {
    key: 'noise',
    icon: noiseIcon,
    label: '噪声'
  }, {
    key: 'wp',
    icon: windPowerIcon,
    label: '风力'
  }, {
    key: 'atm',
    icon: atmIcon,
    label: '大气压'
  }, {
    key: 'ws',
    icon: windSpeedIcon,
    label: '风速'
  }, {
    key: 'tem',
    icon: temperatureIcon,
    label: '温度'
  }, {
    key: 'pm10',
    icon: pm10Icon,
    label: 'PM 10'
  }, {
    key: 'pm25',
    icon: pm25Icon,
    label: 'PM 2.5'
  }, {
    key: 'wd360',
    icon: windDirectionIcon,
    label: '风向'
  }
]
const Environment = () => {
  const [token, setToken] = useState(null)
  const [realTimeData, setData] = useState(null)
  // const [tick, setTick] = useState(0)

  const fetchData = (token) => {
    if(token) {
      fetchRealTimeData({
        token: token.token,
        callback: setData
      })
    }
  }
  useEffect(() => {
    fetchToken({
      callback: setToken
    })
    fetchNodeTest()
  }, [])

  useEffect(() => {
    fetchData(token)
    const timer = setInterval(() => {
      fetchData(token)
    }, 10000)
    return () => clearInterval(timer)
  }, [token])

  return (
    <div>
      <Typography.Title level={4}>实时数据 / Real Time Data</Typography.Title>
      <div className={styles.data}>
        {
          list.map(({ icon, label, key }) => {
            const number = realTimeData && realTimeData[key]
            return <DataItem icon={icon} label={label} key={key} number={number} />
          })
        }
      </div>
    </div>
  )
}

export default Environment
