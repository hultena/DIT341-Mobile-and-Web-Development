<template>
  <b-card
    :title='title'
    :img-src='imageSrc'
    img-top
    tag='recipe'
  >
    <b-card-text>
      <p>
        <b-icon-heart /> {{ likes }}
      </p>
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
    description: String
  }
}
</script>

<style scoped>

</style>
