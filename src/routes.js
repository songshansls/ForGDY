import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import ga from 'constants/ga'
import { Environment } from './containers'

const country = process.env.COUNTRY
const env = process.env.SERVER_ENV
const isProduction = process.env.NODE_ENV === 'production'

ReactGA.initialize(ga[country])
if (!(env === 'live' && isProduction)) {
  ReactGA.set({ 'sendHitTask': null })
}

export default class extends React.Component {
  render () {
    return <Router>
      <Switch>
        <Route exact path='/' component={Environment} />
      </Switch>
    </Router>
  }
}
