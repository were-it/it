const path = require('path')

module.exports = function (api) {
  api.cache(true)

  const APP_ENV = process.env.APP_ENV || 'development'
  const envPath = path.resolve(__dirname, `../..`, `.env.${APP_ENV}`)

  require('dotenv').config({
    path: envPath,
  })

  return {
    presets: [
      '@expo/next-adapter/babel',
      ['babel-preset-expo', { jsxRuntime: 'automatic' }],
    ],
    plugins: [
      'react-native-reanimated/plugin',
      'nativewind/babel',
      ['inline-dotenv', { path: envPath }],
    ],
  }
}
