<template>
  <div class="entertain-me">
<!--    copypasted from home -> abstract -->
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Entertain Me
        </p>
      </div>
    </section>

    <div>
      <div class="navbar-item">

        <div class="field has-addons">
          <div class="control">
            <input type="number" class="input" v-model="recommendMinutes">
          </div>

          <div class="control">
            <button class="button is-success" @click="getRecommendedContent(recommendMinutes)">
                      <span class="icon">
                      <i class="fas fa-play"></i>
                      </span>
            </button>
          </div>
        </div>

      </div>
    </div>


    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Content
        </h2>
      </div>

    </div>

<!--    FIXME copypaste -> component-->
    <div>
        <div class="column is-12" v-for="content in recommendedContent" v-bind:key="content._id">

          <div class="box">
            <figure class="image mb-4">
              <!--            <img :src="content.thumbnails.high.url">-->
            </figure>

            <h3 class="is-size-4">{{ content.title }}</h3>
            <p>{{ content.description }}</p>
          </div>

        </div>
<!--        <div v-observe-visibility="handleInfinityScroll">-->

<!--        </div>-->
      </div>





  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EntertainMe",
  data() {
    return {
      recommendedContent: [],
      recommendMinutes: 4,
    }
  },
  components: {},
  methods: {

    async getRecommendedContent(mins) {
      console.log(mins)
      try {
        const response = await axios.get(
            'api/v1/contents/me/recommend/'
        );
        // JSON responses are automatically parsed.
        const data = await response.data;
        this.recommendedContent.push(...data);
        // if (this.page === 0) {
        //   this.page = 1
        // }

      } catch (error) {
        console.log(error);
      }


      // axios.get('api/v1/contents/latest-contents/').then(response => {
      //   console.log(response.data)
      //   console.log(this.latestContents)
      //   this.latestContents.concat(response.data)
      //
      // }).catch(error => {
      //   console.log(error)
      // })
    },


  }
}
</script>

<style scoped>

</style>