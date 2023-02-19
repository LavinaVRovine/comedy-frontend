<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img v-bind:src="portal.get_thumbnail">
      </figure>
      <h3 class="is-size-4">{{ portal.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "PortalBox",
  props: {
    portal: Object
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