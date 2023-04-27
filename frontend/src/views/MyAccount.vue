<template>
  <div class="page-my-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My account</h1>
      </div>

      <div class="column is-12">
        <button @click="logout()" class="button is-danger">Log out</button>
      </div>

      <hr>

      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">My portals</h2>
        </div>

        <UserPortalBox
            v-for="userPortal in myPortals"
            v-bind:key="userPortal.portal.id"
            v-bind:userPortal="userPortal"/>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PortalBox from "@/components/PortalBox";
import UserPortalBox from "@/components/UserPortalBox";

export default {
  name: "MyAccount",
  data() {
    return {
      myPortals: []
    }
  },
  components: {
    PortalBox,
    UserPortalBox,
  },

  mounted() {
    this.getMyPortals()
  },
  methods:
      {
        logout() {
          axios.defaults.headers.common["Authorization"] = ""

          localStorage.removeItem("token")
          localStorage.removeItem("username")
          localStorage.removeItem("userid")

          this.$store.commit("removeToken")
          this.$router.push("/")

        },

        async getMyPortals() {
          // this.$store.commit('setIsLoading', true)
          await axios
              .get('/api/v1/user-portals/me/')
              .then(response => {

                this.myPortals = response.data
              })
              .catch(error => {
                console.log(error)
              })
          // this.$store.commit('setIsLoading', false)
        }
      },
}
</script>

<style scoped>

</style>