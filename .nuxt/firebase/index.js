import createApp from './app.js'

import authService from './service.auth.js'
import databaseService from './service.database.js'
import firestoreService from './service.firestore.js'
import storageService from './service.storage.js'
import performanceService from './service.performance.js'
import analyticsService from './service.analytics.js'

const appConfig = {"apiKey":"AIzaSyA6Cb4dnBYHDoVuTh56vs6po_FPHHP-1Yw","authDomain":"what-what-7b439.firebaseapp.com","projectId":"what-what-7b439","storageBucket":"what-what-7b439.appspot.com","messagingSenderId":"865337172291","appId":"1:865337172291:web:a157856e2d9c8109434ff6","measurementId":"G-R3F9CRMFGE"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    databaseService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),
    storageService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      databaseService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),
      storageService(session, firebase, ctx, inject),
      performanceService(session, firebase, ctx, inject),
      analyticsService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    database,
    firestore,
    storage,
    performance,
    analytics
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    database: database,
    firestore: firestore,
    storage: storage,
    performance: performance,
    analytics: analytics
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}