import colors from 'vuetify/es5/util/colors'
const isDev = process.env.NODE_ENV === 'development';
const useEmulators = false; // manually change if emulators needed

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - trello-clone',
    title: 'trello-clone',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/filters',
    '~/plugins/fontawesome.js'
  ],
  purgeCSS: {
    whitelistPatterns: [/svg.*/, /fa.*/]
  },
  router: {
    middleware: ['auth']
  },


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyA6Cb4dnBYHDoVuTh56vs6po_FPHHP-1Yw",
          authDomain: "what-what-7b439.firebaseapp.com",
          projectId: "what-what-7b439",
          storageBucket: "what-what-7b439.appspot.com",
          messagingSenderId: "865337172291",
          appId: "1:865337172291:web:a157856e2d9c8109434ff6",
          measurementId: "G-R3F9CRMFGE"
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChanged',
            },
            ssr: false,
            emulatorPort: isDev && useEmulators ? 9099 : undefined,
            disableEmulatorWarnings: false,
          },
          firestore: true,
          storage: true,
          performance: true,
          analytics: true,
          database: {
            emulatorPort: isDev && useEmulators ? 9000 : undefined,
          },
        }
      }
    ]
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
