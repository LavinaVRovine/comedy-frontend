<template>

  <div class="column is-3">
<!--TODO: tohle by melo byt uzito jako component i v mycontent source-->
  <router-link v-bind:to="currentRoutePath + userPortal.portal.get_url_slug" class="button is-dark">
    <PortalBox v-bind:portal="userPortal.portal" v-bind:key="userPortal.id">
    </PortalBox>
  </router-link>

    <div class="buttons">
      <template v-if="thisPageUserPortal.watching">
        <button @click="switchFollowStatusPortal()" class="button is-danger">Unfollow</button>
      </template>
      <template v-else>
        <button @click="switchFollowStatusPortal( )" class="button is-danger">Follow</button>
      </template>

      <router-link
          :to="{path: currentRoutePath + thisPageUserPortal.portal.get_url_slug, query: {'user_portal_id':thisPageUserPortal.id}}"
          class="button is-dark">
      setup
        </router-link>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import {useSwitchFollowStatusPortal} from "@/updateUserPortal";
import {onMounted, reactive, ref} from "vue"
import PortalBox from "@/components/PortalBox";

export default {
  name: "UserPortalBox",
  props: {
    userPortal: Object
  },

  // // TODO: i failed to figure out that composition API thingy. Would be nice though
  // setup(props){
  //   //const thisPageUserPortal = ref(this.userPortal)
  //   const userPortal = props.userPortal
  //   debugger
  //   // onMounted((props) => {
  //   //   debugger
  //   //   this.thisPageUserPortal = userPortal
  //   //     }
  //   //
  //   // )\
  //
  //   const {data_, doUpdate} = useSwitchFollowStatusPortal(userPortal);
  //   //let doUpdate = () => {console.log('called')}
  //   const thisPageUserPortal = data_
  //   console.log(typeof doUpdate)
  //   //const userPortal = data_
  //   debugger
  //   return {
  //     data_,
  //     doUpdate,
  //     thisPageUserPortal
  //   }
  // },
  data() {
    return {
      thisPageUserPortal: this.userPortal
    }
  },
  components: {PortalBox},
  computed: {
    currentRoutePath(){return this.$route.path}
  },
  // const {data, error} = useSwitchFollowStatusPortal(thisPageUserPortal)
  methods: {
    // switchFollowStatusPortal(thisPageUserPortal) {
    //   const data = useSwitchFollowStatusPortal(thisPageUserPortal)
    //   debugger
    //
    // },
    // CARE: this is ctrl+c with other component. dunno how to reuse
    async switchFollowStatusPortal(){

      axios.put(`/api/v1/user-portals/me/${this.thisPageUserPortal.id}`, {"watching": !this.thisPageUserPortal.watching})
              .then(response => {
                this.thisPageUserPortal = response.data
                // this is only in scope, ie in this element. I should emit it to parent https://javascript.plainenglish.io/avoid-mutating-a-prop-directly-7b127b9bca5b
                // but i dont think its necessary as the parent should just hit api any way.
                // IF problems I'd say this should be it so see the link
              })
              .catch(error => {
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