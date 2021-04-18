<template>
  <v-app>
    <v-main>
      <div class="d-block">
        <v-container fluid class='board-topbar'>
          <v-row no-gutters>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0">
              <v-icon @click="drawer = true">mdi-menu</v-icon>
            </v-col>
            <v-col
              cols='10'
              class='logo col-sm-7'
            >
              <nuxt-link to='/'>
                <img class='logo-main ' src='~/assets/icons/logo/Logo.svg' alt='Ze'/>
              </nuxt-link>
              <img src='~/assets/icons/logo/Ze.svg' alt='Ze'/>
              <img src='~/assets/icons/logo/Board-125x31.svg' alt='Board'/>
            </v-col>
          </v-row>
        </v-container>


        <v-navigation-drawer v-model="drawer" fixed left class="d-block">
          <v-container fluid class="jello-topbar">
            <v-row no-gutters align="center" justify="space-between">
              <v-icon @click="drawer = false">mdi-close</v-icon>

              <v-row no-gutters align="center" justify="end">
                <!--                <p class="jello-user">Signed in as<br>-->
                <!--                  {{ $nuxt.$fire.auth.currentUser.email }}</p>-->
                &nbsp;
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-row>

            </v-row>
          </v-container>
          <v-container class="d-block menu-items">
            <div class="d-flex flex-column">
              <div class="d-flex">
                <br/>

              </div>
              <div class="d-flex">
                <nuxt-link to="/">
                  <v-icon>mdi-view-dashboard-variant-outline</v-icon>&nbsp;&nbsp;<b>My Boards</b>
                </nuxt-link>
              </div>
              <div class="d-flex">
                <button @click="logout">
                  <v-icon>mdi-exit-to-app</v-icon>&nbsp;&nbsp;<b>Sign out</b>
                </button>
              </div>
            </div>
          </v-container>
        </v-navigation-drawer>
      </div>
      <!-- content -->
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      //buttons
      drawer: false
    }
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.$router.push('/auth/signin')
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.menu-items a {
  padding: 5px;

  color: $text-color;
  padding: 10px 0px 10px 3px;
  font-size: 24px;
}
</style>
