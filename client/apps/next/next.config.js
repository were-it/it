const APP_ENV = process.env.APP_ENV || 'development'

require('dotenv').config({
  path: `../../.env.${APP_ENV}`,
})

const env = {}

Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    env[key] = process.env[key]
  }
})

const { withExpo } = require('@expo/next-adapter')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'solito',
  'moti',
  'nativewind',
  'app',
])
const withFonts = require('next-fonts')
const withImages = require('next-images')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  webpack5: true,
  experimental: {
    forceSwcTransforms: true,
    swcPlugins: [[require.resolve('./plugins/swc_plugin_reanimated.wasm')]],
  },
}

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: '../../' }]],
  {
    ...nextConfig,
    env,
  }
)
