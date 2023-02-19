<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
<!--        <img v-bind:src="userSource.source.get_thumbnail">-->
      </figure>
      <h3 class="is-size-4">{{ userSource.source.source_name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSourceBox",
  props: {
    userSource: Object
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