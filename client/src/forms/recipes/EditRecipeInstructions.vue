<template>
  <b-form-group
    label='Recipe instructions'
    label-for='recipe-instructions'
    id='instructionsContainer'
  >
    <b-input-group
      v-for='(instruction, index) in instructions'
      :key='index'
      class='pt-1 pb-3'
    >
      <b-form-input
        id='recipe-instructions'
        v-model='instruction.step'
        :name='`instructions[${index}][step]`'
        type='text'
        placeholder='Write an instruction step here.'
      />
    </b-input-group>

    <b-button
      @click='addInstruction'
      variant='outline-primary'
      block
    >
      <b-icon-plus-circle /> Add instruction
    </b-button>
  </b-form-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditRecipeInstructions',

  props: {
    recipe: {
      user: null,
      name: '',
      category: '',
      description: '',
      image: '',
      ingredients: [],
      allergies: [],
      dietaryRestrictions: [],
      instructions: []
    }
  },

  computed: { ...mapGetters(['oneRecipe', 'loggedInUser']) },

  methods: {
    ...mapActions(['patchRecipe']),

    // TODO: Make this get added to the this.recipe instructions too, not just the data array.

    addInstruction() {
      this.instructions.push({ step: '' })
      this.recipe.instructions = this.instructions

      this.onSubmit()
    },

    async onSubmit() {
      const message = await this.patchRecipe(this.recipe)

      if (message !== undefined) {
        this.$refs.observer.setErrors(message)
        console.log(message)
      }
    }
  },

  data: () => ({
    instructions: [
      { step: '' }
    ]
  }),

  mounted() {
    this.recipe.user = this.loggedInUser._id
  }
}
</script>
