<template>
  <div>
    <b-checkbox
      v-for='instruction in this.instructions'
      :key='instruction.step'
      class='mt-3'
      stacked
      size='lg'
    >
      {{ instruction.step }}
    </b-checkbox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ListInstructions',

  computed: { ...mapGetters(['oneRecipe']) },

  data() {
    return {
      selected: [],
      instructions: []
    }
  },

  mounted() {
    this.instructions = this.oneRecipe.instructions
  }
}
</script>
