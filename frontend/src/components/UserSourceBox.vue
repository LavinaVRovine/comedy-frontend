<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
<!--        <img v-bind:src="userSource.source.get_thumbnail">-->
      </figure>
      <h3 class="is-size-4">{{ thisPageUserSource.source.source_name }}</h3>
      <div class="buttons">
          <template v-if="thisPageUserSource.watching">
            <button @click="switchFollowStatusPortal()" class="button is-danger">Unfollow</button>
          </template>
          <template v-else>
            <button @click="switchFollowStatusPortal()" class="button is-danger">Follow</button>
          </template>

        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserSourceBox",
  props: {
    userSource: Object
  },
  data(){
    return {
      thisPageUserSource: this.userSource
    }
  },
  methods: {

    async switchFollowStatusPortal() {

      axios.put(`/api/v1/sources/me/sources/${this.thisPageUserSource.id}`, {"watching": !this.thisPageUserSource.watching})
          .then(response => {
            this.thisPageUserSource = response.data
            // this is only in scope, ie in this element. I should emit it to parent https://javascript.plainenglish.io/avoid-mutating-a-prop-directly-7b127b9bca5b
            // but i dont think its necessary as the parent should just hit api any way.
            // IF problems I'd say this should be it so see the link

            // oh i see, i hacked it by getting the portal from the api, meaning iam not working
            // from the one from parent template but a new obj
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