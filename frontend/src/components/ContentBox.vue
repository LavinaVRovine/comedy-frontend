<template>
  <div class="column is-4">
    <div class="box">
      <figure class="image mb-4">
        <img alt="content-img" :src="content.get_thumbnails.url" :width="content.get_thumbnails.width"
             :height="content.get_thumbnails.height">
      </figure>

      <h3 class="is-size-4">{{ content.title }}</h3>
      <p>{{ content.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBox',
  props: {content: Object}
}

</script>
<style scoped>

.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>