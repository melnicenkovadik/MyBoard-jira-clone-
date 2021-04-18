<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" >
      <form v-if='!isLoggedIn' onsubmit='return false;'>
        <div>
          <input
            v-model='formData.email'
            placeholder='Email'
            type='email'
          />
        </div>
        <div class='mb-4'>
          <input
            v-model='formData.password'
            placeholder='Password'
            type='password'
          />
        </div>
        <button @click='createUser'>Register</button>
        <button @click='signInUser'>Sign In</button>
      </form>
      <v-snackbar
        :timeout="4000"
        v-model="snackbar"
        absolute
        bottom
        center
      >
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'signin',
  computed: {
    ...mapState({
      authUser: (state) => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  data: () => ({
    snackbar: false,
    snackbarText: 'No error message',
    formData: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>
