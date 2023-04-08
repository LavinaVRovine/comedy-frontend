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
            <button @click="switchFollowStatusPortal()" class="button is-danger">Unfollow</button>
          </template>
          <template v-else>
            <button @click="switchFollowStatusPortal()" class="button is-danger">Follow</button>
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
    },

    async switchFollowStatusPortal() {

      axios.put(`/api/v1/portals/me/portals/${this.userPortal.id}`, {"watching": !this.userPortal.watching})
          .then(response => {
            this.userPortal = response.data
            // this is only in scope, ie in this element. I should emit it to parent https://javascript.plainenglish.io/avoid-mutating-a-prop-directly-7b127b9bca5b
            // but i dont think its necessary as the parent should just hit api any way.
            // IF problems I'd say this should be it so see the link

            // oh i see, i hacked it by getting the portal from the api, meaning iam not working
            // from the one from parent template but a new obj
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
</script>

<style scoped>

</style>