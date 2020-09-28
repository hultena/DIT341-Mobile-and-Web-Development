<template>
  <div>
  <b-card @click="setChosenCard">
    <b-card-body>
      <b-card-title>Card Title</b-card-title>
      <b-card-sub-title class="mb-2">Card Sub Title</b-card-sub-title>
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </b-card-text>
    </b-card-body>

    <b-list-group flush>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>

    <b-card-body>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </b-card-body>

    <b-card-footer>
      <b-button>Edit</b-button>
    </b-card-footer>
  </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ShoppingListCard',
  props: {
    shoppingList: {}
  },
  methods: {
    ...mapActions(['selectShoppingList']),
    setChosenCard() {
      this.selectShoppingList(this.shoppingList)
    }
  },
  computed: {
    ...mapGetters([])
  }
}
</script>

<style scoped>

</style>
