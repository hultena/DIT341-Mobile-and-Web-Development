<template>
  <b-card
    :title='title'
    :img-src='imageSrc'
    img-top
    role='button'
    @click='handleClick'
  >
    <b-card-text>

      <b-card-sub-title class='mb-3'>
        <b-icon-heart /> {{ likes }},
        created by
        <b-link :href='profileLink'>{{ username }}</b-link>
      </b-card-sub-title>

      <p>
        {{ description | snippet }}
      </p>

    </b-card-text>
  </b-card>
</template>

<script>

export default {
  name: 'RecipeCard',

  props: {
    imageSrc: String,
    title: String,
    likes: Number,
    profileLink: String,
    username: String,
    description: String,
    recipeLink: String
  },

  methods: {
    handleClick() {
      // TODO: have 'path' equal recipeLink in props. I get errors. Idk how (?)

      const path = 'recipeLink'
      this.$router.push(path)

      console.log('This card has been clicked!')
    }
  }
}
</script>
