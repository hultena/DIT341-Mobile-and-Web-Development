<template>
  <b-container>

    <b-row>
      <b-col>
        <h1>
          Lorem ipsum dolor sit amet
        </h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur
        </h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <RecipeSearch />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <!-- TODO: Recipe search results go here. -->
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
// @ is an alias to /src
// import { Api } from '@/Api'
import RecipeSearch from '@/forms/RecipeSearch'

export default {
  name: 'home',

  components: { RecipeSearch },

  data() {
    return {
      message: 'none'
    }
  },

  methods: {
    /*
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
    */
  }
}
</script>
