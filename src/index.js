import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { I18nextProvider } from 'react-i18next'
import { AppContainer } from 'react-hot-loader'
import Environment from 'containers/Environment'
import 'index.css'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Environment)

if (module.hot) {
  module.hot.accept('routes', () => {
    render(App)
  })
}
