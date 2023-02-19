<template v-if="userPortal">
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9" v-if="userPortal.portal">
        <figure class="image mb-6">
<!--          <img v-bind:src="userPortal.portal.get_thumbnail">-->
        </figure>

        <h1 class="title">{{ userPortal.portal.name }}</h1>

        <div class="buttons">
          <template v-if="userPortal.watching">
            <button @click="unfollow()" class="button is-danger">Unfollow</button>
          </template>
          <template v-else>
            <button @click="follow()" class="button is-danger">Follow</button>
          </template>

        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">My Sources</h2>
        </div>

<!--        <PortalBox-->
<!--            v-for="portal in myPortals"-->
<!--            v-bind:key="portal.id"-->
<!--            v-bind:portal="portal"/>-->

        <UserSourceBox
            v-for="userSource in userPortal.user_sources"
            v-bind:key="userSource.id"
            v-bind:userSource="userSource"/>

      </div>
    </div>
  </div>

</template>


<script>
import axios from "axios";
import UserSourceBox from "@/components/UserSourceBox";

export default {
  name: "MyAccountContentSource",

  data() {
    return {
      userPortal: {},

    }
  },
  components: {
    UserSourceBox
  },
  mounted() {
    this.getMyPortal()
  },
  methods: {
    async getMyPortal() {
      this.$store.commit('setIsLoading', true)
      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/portals/me/portals/${portal_slug}`)
          .then(response => {
            // debugger;
            this.userPortal = response.data

          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>

<style scoped>

</style>