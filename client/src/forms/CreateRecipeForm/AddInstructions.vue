<template>
  <b-form-group
    label='Recipe instructions'
    label-align='left'
    id='instructionsContainer'
  >
    <b-input-group
      v-for='(instruction, index) in instructions'
      :key='index'
      class='pt-1 pb-3'
    >
      <b-form-input
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
export default {
  name: 'AddInstructions',

  data: () => ({
    instructions: [
      { step: '' }
    ]
  }),

  methods: {
    addInstruction() {
      this.instructions.push({ step: '' })

      const data = {
        instructions: this.instructions
      }
      alert(JSON.stringify(data, null, 2))
    }
  }
}
</script>
