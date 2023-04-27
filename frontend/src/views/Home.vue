<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          My title
        </p>
      </div>
    </section>


    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Latest something
        </h2>
      </div>

      <ContentBox
          v-for="content in latestContents"
          v-bind:key="content._id"
          v-bind:content="content"/>


      <div v-observe-visibility="handleInfinityScroll">

      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import ContentBox from "@/components/ContentBox";

export default {
  name: 'Home',
  data() {
    return {
      latestContents: [],
      page: 0,
      maxPages: 10,
    }
  },
  components: {ContentBox},
  mounted() {
    this.getLatestContent()
  },
  methods: {
    // async getLatestContent() {
    //   axios.get('api/v1/contents/latest-contents/').then(response => {
    //     // if (this.latestContents === []) {
    //     //   this.latestContents = response.data
    //     // }
    //     // else {
    //     //   this.latestContents.push(response.data)
    //     // }
    //
    //     this.latestContents = response.data
    //     this.page = 1
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    async getLatestContent() {


      try {
        const response = await axios.get(
            'api/v1/contents/latest-contents/'
        );
        // JSON responses are automatically parsed.
        const data = await response.data;
        this.latestContents.push(...data);
        if (this.page === 0) {
          this.page = 1
        }

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
    handleInfinityScroll(isVisible) {
      if (!isVisible) {
        return;
      }
      if (this.page >= this.maxPages || this.page === 0) {
        return;
      }
      this.page++
      this.getLatestContent()
    },
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
  margin-bottom: -1.25rem;
}


</style>
