<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign Up</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="email">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>


          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error"> {{ error }}</p>
          </div>

          <div class="field">

            <div class="control">
              <button class="button is-dark">Login</button>
            </div>
          </div>
          <hr>

          Or
          <router-link to="/sign-up">click here</router-link>
          to sign up!


        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",
  data() {
    return {
      email: '',
      password: '',

      errors: []
    }
  },
  mounted() {
    document.title = 'Log In'
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")

      const formData = {
        email: this.email,
        password: this.password
      }
      const params = new URLSearchParams();
      params.append('username', this.email);
      params.append('password', this.password);
      await axios
          .post("/api/v1/login/access-token/", params)
          .then(response => {
            const token = response.data.access_token
            this.$store.commit('setToken', token)

            axios.defaults.headers.common["Authorization"] = "Bearer " + token
            localStorage.setItem("token", token)
            this.$router.push("/")
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
            } else {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify(error))
            }
          })
    }
  }
}
</script>

<style scoped>

</style>