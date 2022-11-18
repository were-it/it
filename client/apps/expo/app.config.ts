import { ExpoConfig } from '@expo/config-types'

const path = require('path')

const env: typeof process.env.APP_ENV = process.env.APP_ENV || 'development'

const isDev = env.startsWith('dev')

const envPath = path.resolve(__dirname, `../../`, `.env.${env}`)

require('dotenv').config({
  path: envPath,
})

// eslint-disable-next-line import/no-anonymous-default-export
const config: ExpoConfig = {
  name: 'it',
  slug: 'it',
  owner: 'were-it',
  version: '1.0.0',
  scheme: 'it',
  platforms: ['ios', 'android'],
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: 'app.wereit.it',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'app.wereit.it',
  },
  extra: {
    eas: {
      projectId: 'c66ec4a7-3898-439f-8b64-8ab5f6ff229d',
    },
  },
}

export default config
