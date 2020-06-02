
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    {
      src: '~/plugins/sweetalert'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-fontawesome',
    'nuxt-material-design-icons'

  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL:'http://3.34.99.192:4000/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '\[path\][name].[ext]'
        }
      })
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/token', method: 'post', propertyName: false },
          logout: false,
          user: { url: '/users/me', method: 'get', propertyName: false }
        }
      }
    }
  }
}
