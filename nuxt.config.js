const config = require('./config.js')
console.log('baseUrl', `http://${config.address.host}:${config.address.port}`)

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '奇怪的背单词',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '奇怪的背单词, 30秒记住一个单词' },
      { hid: 'keywords', name: 'keywords', content: '奇怪的背单词, 背单词, 背单词方法, 30秒记住一个单词, 考研单词, 考研英语, 雅思单词, gre单词' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: config.address.port
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#777'
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/reset.scss',
    '@/assets/css/basic.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: `http://${config.address.host}:${config.address.port}`
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend () {
    }
  }
}
