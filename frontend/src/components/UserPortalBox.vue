<template>

  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <router-link v-bind:to="currentRoutePath + userPortal.portal.get_url_slug" class="button is-dark">
          <img v-bind:src="userPortal.portal.get_thumbnail">
        </router-link>


      </figure>
      <h3 class="is-size-4">{{ userPortal.portal.name }}</h3>
    </div>


    <div class="buttons">
      <template v-if="userPortal.watching">
        <button @click="switchFollowStatusPortal(userPortal.id)" class="button is-danger">Unfollow</button>
      </template>
      <template v-else>
        <button @click="switchFollowStatusPortal(userPortal.id)" class="button is-danger">Follow</button>
      </template>


      <router-link v-bind:to="currentRoutePath + userPortal.portal.get_url_slug" class="button is-dark">
          setup
        </router-link>




    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserPortalBox",
  props: {
    userPortal: Object
  },
  computed: {
    currentRoutePath(){return this.$route.path}
  },
  methods: {
    async switchFollowStatusPortal(userPortalId){

      axios.put(`/api/v1/portals/me/portals/${userPortalId}`, {"watching": !this.userPortal.watching})
              .then(response => {
                debugger
                this.userPortal = response.data
                skoncil jsem tady pze se mi nedari tady tohle mutatnout
              })
              .catch(error => {
                debugger
                console.log(error)
              })


    },
  }

}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>