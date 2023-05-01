<template>


  <div class="columns is-12">
    <div class="column is-offset-1"></div>
    <div class="column is-10">
      <div class="box">
        <div class="columns is-vcentered">
          <div class="column ">
            <figure class="image mb-4">
              <img alt="content-img" :src="content.get_thumbnails.url" :width="content.get_thumbnails.width"
                   :height="content.get_thumbnails.height">
            </figure>
          </div>
          <div class="column">
            <h3 class="is-size-4">{{ content.title }}</h3>
            <p>{{ content.description }}</p>
          </div>

        </div>
      </div>
    </div>
    <div class="column is-1"></div>
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