<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <PortalBox v-bind:portal="portal"/>

      <div class="column is-3">
        <h2 class="subtitle">Information</h2>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { toast } from 'bulma-toast'
import PortalBox from "@/components/PortalBox";

export default {
  name: "Portal",
  data() {
    return {
      portal: {},
    }
  },
  mounted() {
    this.getPortal()
  },
  methods: {
    async getPortal() {
      this.$store.commit('setIsLoading', true)

      const portal_slug = this.$route.params.portal_slug
      await axios
          .get(`/api/v1/products/${product_slug}`)
          .then(response => {
            this.product = response.data
            document.title = this.portal.name + ' | Uhm title'
          })
          .catch(error => {
            console.log(error)
          })

      this.$store.commit('setIsLoading', false)
    },
  }
}
</script>

<style scoped>

</style>