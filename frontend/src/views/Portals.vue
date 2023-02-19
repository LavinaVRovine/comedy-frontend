<template>
  <div class="columns is-multiline">
    <div class="column is-12">
      <h2 class="is-size-2 has-text-centered">Supported portals</h2>
    </div>

    <PortalBox
        v-for="portal in supportedPortals"
        v-bind:key="portal.id"
        v-bind:portal="portal"/>
  </div>
</template>

<script>
import axios from "axios";
import PortalBox from "@/components/PortalBox";
export default {
  name: "Portals",
  data() {
    return {
      supportedPortals: []
    }
  },
  components: {
    PortalBox,
  },
  mounted() {
    this.getSupporterPortals()
  },
  methods: {
    async getSupporterPortals() {
      // this.$store.commit('setIsLoading', true)
      await axios
        .get('/api/v1/portals/')
        .then(response => {
          this.supportedPortals = response.data
        })
        .catch(error => {
          console.log(error)
        })
      // this.$store.commit('setIsLoading', false)
    }
  }

}
</script>

<style scoped>

</style>