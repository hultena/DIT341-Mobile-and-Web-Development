<template>
  <div class='home-page'>

    <div class='hero'>
      <div class='content'>
        <b-container>
          <b-row class='mb-3'>
            <b-col class='mt-5'>
              <h1>
                What are you cooking today?
              </h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <advanced-search />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>

    <div class='content'>
      <b-container class='home-page'>

        <b-row>
          <b-col
            v-for='recipe in allRecipes'
            :key='recipe._id'
          >
            <recipe-card :recipe='recipe' class="my-3" />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-button
              variant='primary'
              @click='expandResults'
              block
              class='mt-4'
            >
              Show more results
            </b-button>
          </b-col>
        </b-row>

      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecipeCard from '@/components/RecipeCard'
import AdvancedSearch from '@/components/AdvancedSearch'
export default {
  name: 'home',
  components: { AdvancedSearch, RecipeCard },
  data() {
    return {
      form: {
        page: 1,
        limit: 5,
        value: null,
        filter: null
      }
    }
  },
  methods: {
    ...mapActions(['getRecipes']),

    expandResults() {
      this.form = this.selectedQuery
      this.form.page += 1
      this.$store.commit('setQuery', this.form)
      this.getRecipes()
    }
  },
  computed: {
    ...mapGetters(['allRecipes', 'selectedQuery'])
  },
  created() {
    this.$store.state.recipes.recipes = []
    this.$store.commit('setQuery', this.form)
    this.getRecipes()
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 70vh !important;
  width: 100vw;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, .6) 100%),
    url('../assets/hero-background.gif')
    no-repeat
    center;
  background-size: cover;
}
.hero > .content {
  width: 100vw;
  position: absolute;
  bottom: 0;
  padding-bottom: 50px;
}

.hero > .content h1 {
  color: #fff !important;
  padding-bottom: 20px;
}

.home-page > .content { padding: 50px 0 100px 0 }
</style>
