<template v-if="userPortal">
  <div class="page-product">
    <!--    <div class="columns is-multiline">-->

    <div class="column is-9" v-if="userPortal.portal">
      <PortalBox v-bind:portal="userPortal.portal" v-bind:key="userPortal.id">
      </PortalBox>

      <div class="buttons">
        <template v-if="userPortal.watching">
          <button @click="switchFollowStatusPortal()" class="button is-danger">Unfollow</button>
        </template>
        <template v-else>
          <button @click="switchFollowStatusPortal()" class="button is-danger">Follow</button>
        </template>


        <template v-if="userPortal.syncable">
          <button class="button">Sync with remote</button>
        </template>


      </div>
    </div>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">My Sources</h2>
      </div>

      <UserSourceBox
          v-for="userSource in mySources"
          v-bind:key="userSource.id"
          v-bind:userSource="userSource"/>

    </div>


    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Recommended Sources</h2>
      </div>

      <UserSourceBox
          v-for="userSource in recommendedSources"
          v-bind:key="userSource.id"
          v-bind:userSource="userSource"/>

    </div>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Other Sources</h2>
        <button @click="getOtherSources()" class="button is-dark">Show</button>
      </div>
      <div class="buttons">


      </div>
      <UserSourceBox
          v-for="userSource in otherSources"
          v-bind:key="userSource.id"
          v-bind:userSource="userSource"/>

    </div>
  </div>

</template>


<script>
import axios from "axios";
import UserSourceBox from "@/components/UserSourceBox";
import PortalBox from "@/components/PortalBox";
export default {
  name: "MyAccountContentSource",

  data() {
    return {
      userPortal: {},
      mySources:[],
      recommendedSources:[],
      otherSources:[],

    }
  },
  components: {
    UserSourceBox,
    PortalBox,
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage: function (){
      {
            this.$store.commit('setIsLoading', true)
            Promise.all([this.getMyPortal(), this.getMySources(), this.getRecommendedSources(),])
           .then(data => {
              // Use data here
              this.$store.commit('setIsLoading', false)
            })
          .catch(err => {
            // user err to display message
            this.$store.commit('setIsLoading', false)
          });
     }
    },

    async getMyPortal() {
      this.$store.commit('setIsLoading', true)
      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/user-portals/me/${portal_slug}`)
          .then(response => {
            this.userPortal = response.data

          })
          .catch(error => {
            debugger
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },

    async switchFollowStatusPortal() {

      axios.put(`/api/v1/user-portals/me/${this.userPortal.id}`, {"watching": !this.userPortal.watching})
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
            debugger
          })
    },
    async getMySources() {
      this.$store.commit('setIsLoading', true)
      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/user-sources/me/${portal_slug}`,  )
          .then(response => {
            // debugger;
            this.mySources = response.data

          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    async getRecommendedSources() {
      this.$store.commit('setIsLoading', true)
      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/user-sources/me/${portal_slug}`, {params:{"source_type": "recommended"}})
          .then(response => {
            // debugger;
            this.recommendedSources = response.data

          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    async getOtherSources() {
      this.$store.commit('setIsLoading', true)
      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/user-sources/me/${portal_slug}`, {params:{"source_type": "other"}})
          .then(response => {
            // debugger;
            this.otherSources = response.data

          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
  },
}
</script>

<style scoped>

</style>