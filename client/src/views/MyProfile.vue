<template>
  <div class='profilePage'>
    <section>
      <h1>
        Welcome {{this.loggedInUser.username}}
        <router-link to="my-settings">
        <b-button>Settings</b-button>
        </router-link>
      </h1>
      <h2>
        {{this.loggedInUser.email}}
      </h2>
    </section>
    <section>
      <p v-if="this.currentView==='recipes'">Placeholder for my recipes</p>
      <p v-if="this.currentView==='ingredients'">Placeholder for my ingredients</p>
      <my-shopping-lists v-if="this.currentView==='shopping'"/>
      <p v-if="this.currentView==='favourites'">Placeholder favourite recipes</p>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MyShoppingLists from '@/views/MyShoppingLists'
export default {
  name: 'myProfile',
  components: { MyShoppingLists },
  data() {
    return {
    }
  },
  methods: {
    ...mapActions([''])
  },
  computed: {
    ...mapGetters(['loggedInUser', 'allShoppingLists', 'currentView'])
  }
}

</script>

<style scoped>
.profilePage {}
</style>
