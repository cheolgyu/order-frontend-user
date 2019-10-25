import colors from 'vuetify/es5/util/colors'
const envPath = `./.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({ path: envPath })
import pkg from "./package";

export default {
  manifest: {
    background_color: "purple",
    description: "Shows random fox pictures. Hey, at least it isn't cats.",
    display: "fullscreen",

    name: process.env.npm_package_name,
    short_name: process.env.npm_package_name,
    start_url: "/index",
  },

  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    script: [
      { src: '/js/oauth/google.js' },
      { src: '/js/oauth/kakao.min.js' },
      { src: '/js/oauth/naver.js' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'google-signin-scope', content: 'profile email' },
      { name: 'google-signin-client_id', content: process.env.VUE_APP_OAUTH_GOOGLE_CLIENT_ID },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ,
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    /*
        {
          src: '~/plugins/sw.js',
          ssr: false
        },
        */
    {
      src: '~/plugins/firebase.js',
      ssr: false
    },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa', ,
    '@nuxtjs/dotenv'
  ],
  dotenv: {
    filename: envPath
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.VUE_APP_API_URL
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
