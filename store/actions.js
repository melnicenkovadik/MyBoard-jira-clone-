export default {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    /** Get the VERIFIED user on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...user } = ctx.res.locals.user

      console.info('Auth User verified on server-side. User: ', user, 'Claims:', claims)

      await dispatch('onAuthStateChanged', {
        user,
        claims
      })
    }
  },

  async onAuthStateChanged({ commit }, { user }) {
    if (!user) {
      commit('RESET_STORE')
      return
    }
    if (user && user.getIdToken) {
      try {
        const idToken = await user.getIdToken(true)
        console.info('idToken', idToken)
      } catch (e) {
        console.error(e)
      }
    }
    commit('SET_AUTH_USER', { user })
  }
}
