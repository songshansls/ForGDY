import i18next from 'i18next'

const resources = process.env.LANGUAGE.resources
const language = Object.keys(resources)[0]

i18next
  .init({
    lng: language,
    fallbackLng: language,
    defaultNS: 'common',
    keySeparator: false,
    debug: process.env.NODE_ENV === 'development',
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  })

export default i18next
