require('dotenv').config()
const pkg = require('./package.json')

let appVersionCacheBuster =
  process.env.CONTEXT === 'production'
    ? process.env.CF_PAGES_COMMIT_SHA
    : pkg.version + '_' + Date.now()

export default {
  env: {
    HOST: process.env.CF_PAGES_URL,
    COMMIT: process.env.CF_PAGES_COMMIT_SHA,
    CONTEXT: process.env.CONTEXT,
    API_URL: process.env.API_URL,
    API_AFFIX: process.env.API_AFFIX,
  },
  publicRuntimeConfig: {
    baseURL: process.env.CF_PAGES_URL || 'http://localhost:3000/',
    version: appVersionCacheBuster,
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'IS-Wireless #5GMadeTogether',
    description: '4G and 5G Mobile Networks of the Future',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '4G and 5G Mobile Networks of the Future',
      },
      {
        src: 'https://cse.google.com/cse.js?cx=4a61290bc618cbfe1',
        async: true,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v=' + appVersionCacheBuster,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true,
      },
      {
        rel: 'preconnect',
        href: 'https://is-wireless.com',
        crossorigin: true,
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.jsdelivr.net',
        crossorigin: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css', '@/assets/animation.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    { src: '~/plugins/vue-google-maps', mode: 'client' },
    { src: '~/plugins/vue-composition-api', mode: 'server' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxt/image',
    '@nuxtjs/pwa',
    [
      '@aceforth/nuxt-netlify',
      {
        mergeSecurityHeaders: true,
        headers: {
          '/*': [
            'Access-Control-Allow-Origin: *',
            `X-Build: ${pkg.version}`,
            `X-Robots-Tag: ${
              (process.env.CF_PAGES_URL &&
                process.env.CF_PAGES_URL.includes('pages.dev')) ||
              process.env.CONTEXT !== 'production'
                ? 'noindex'
                : 'index'
            }`,
          ],
          '/favicon.ico': ['Cache-Control: public, max-age=86400'],
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    {
      src: '@nuxtjs/robots',
      options: {
        robots: {
          UserAgent: '*',
        },
      },
    },
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    {
      src: '@nuxtjs/dotenv',
      options: {
        only: ['API_URL', 'API_AFFIX', 'CONTEXT'],
      },
    },
    {
      src: 'wp-nuxt',
    },
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: ['vue-share-it', /^vue2-google-maps($|\/)/],
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })

      config.node = {
        fs: 'empty',
        'fs-extra': 'empty',
      }
    },
  },
  // render: {
  //   asyncScripts: false,
  //   resourceHints: false,
  //   // injectScripts: false, #need optimisation
  //   crossorigin: 'anonymous',
  //   http2: {
  //     push: true,
  //     pushAssets: (req, res, publicPath, preloadFiles) =>
  //       preloadFiles
  //         .filter((f) => f.asType === 'script')
  //         .map(
  //           (f) =>
  //             `<${publicPath}${f.file}>; rel=preload; as=${f.asType}; crossorigin`
  //         ),
  //   },
  //   compressor: { threshold: 9, level: 9 },
  // },
  generate: {
    dir: 'public',
    crawler: true,
    routes: ['/rd-team'],
    fallback: '404.html',
  },
  image: {
    domains: ['https://www.is-wireless.com/'],
  },
  pwa: {
    meta: {
      name: 'IS-Wireless',
      theme_color: '#00A2DF',
      ogTitle: false,
      ogDescription: false,
      ogType: false,
      ogSiteName: 'IS-Wireless',
      ogHost: process.env.CF_PAGES_URL,
      ogUrl: false,
      twitterCard: 'summary',
      twitterSite: '@is_wireless',
      twitterCreator: 'Sławomir Pietrzyk',
    },
    manifest: {
      lang: 'en',
      theme_color: '#00A2DF',
      id: '/?standalone=true',
      title: 'IS-Wireless',
      name: 'IS-Wireless',
      shortName: 'IS-Wireless',
      orientation: 'any',
      description:
        'IS-Wireless is an advanced wireless communications company. We are developing protocols, simulators and IP algorithms. We also deliver 4G and 5G courses.',
    },
    workbox: {
      cleanupOutdatedCaches: true,
      // offlineStrategy: 'StaleWhileRevalidate',
      cacheOptions: {
        revision: appVersionCacheBuster,
      },
    },
    icon: {
      fileName: 'symbol.png',
    },
  },
  wp: {
    discover: true,
    endpoint: `${process.env.API_URL}${process.env.API_AFFIX}`,
    extensions: true,
    customRoutes: [
      {
        extension: 'wp-api-menus/v2',
        route: '/menus/(?P<id>\\d+)',
        name: 'menuIdSelect',
      },
    ],
    sitemap: false,
    // transport: require('./utils/superagent-cache.js'),
  },
  layoutTransition: {
    name: 'page',
    mode: 'out-in',
  },
}
