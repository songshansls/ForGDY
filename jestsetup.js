const Enzyme = require('enzyme')
const Adaptor = require('enzyme-adapter-react-16')

jest.mock('react-i18next', () => ({
  translate: () => Component => Component
}))

Enzyme.configure({ adapter: new Adaptor() })
