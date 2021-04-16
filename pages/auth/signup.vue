<template>
  <v-row align='center' justify='center'>
    <v-col cols='12' sm='8' md='4' align='center'>
      <v-card class='elevation-4 text-left'>
        <v-card-title class='fancy-title align-center justify-center'>Jello</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label='Name'
              name='name'
              prepend-icon='mdi-account'
              type='text'
              v-model='auth.name'
            ></v-text-field>

            <v-text-field
              label='Email'
              name='email'
              prepend-icon='mdi-account'
              type='text'
              v-model='auth.email'
            ></v-text-field>

            <v-text-field
              label='Password'
              name='password'
              prepend-icon='mdi-lock'
              type='password'
              v-model='auth.password'
            ></v-text-field>
            <v-text-field
              label='Phone'
              name='phone'
              prepend-icon='mdi-phone'
              type='number'
              v-model='auth.phone'
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class='text-center'>
          <v-btn
            class='login-button'
            @click='onSubmit'
            depressed
            large
          >Register
          </v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar
        :timeout='4000'
        v-model='snackbar'
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
import firebase from 'firebase'

export default {
  layout: 'signup',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        name: '',
        email: '',
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
          .then((user) => {
            firebase
              .database()
              .ref(`users/${this.auth.name}`)
              .set({
                name: this.auth.name,
                email: this.auth.email,
                password: this.auth.password,
                phone: this.auth.phone
              })
            return user
          })
        this.$router.push('/auth/signin')
      } catch (error) {
        throw error
        const errorCode = error.code
        const errorMessage = error.message
        alert('ERROE msg: ', errorMessage, 'ERROR code: ', errorCode)
      }
    }
  }
}
</script>
