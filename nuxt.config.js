import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s - Queue',
    title: 'TPLUS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [
    'view-design/dist/styles/iview.css'
  ],

  plugins: [
    '~/plugins/iview.js',
  ],

  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-fonts',
    '@nuxtjs/auth-next',
  ],
  auth: {
    store: '~/store',
    redirect: {
      login: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'user.token',
          global: true,
          name: 'authorization',
          type: '',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: 'http://172.28.17.102:3600/users/loginwithurl', method: 'post' },
          logout: { url: 'http://172.28.17.102:3600/users/logout', method: 'delete' },
          user: { url: 'http://172.28.17.102:3600/users/me', method: 'get' },
        },
      },
    },
  },

  axios: {
    baseURL: '/',
  },
  googleFonts: {
    families: {
      'Noto+Sans+Lao': true, 
    },
  },
  
  proxy: {
    '/users/': {
      target: 'http://172.28.17.102:3600',
      pathRewrite: { '^/users/': '/users/' },
      changeOrigin: true,
      secure: false,
    },
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},
}
