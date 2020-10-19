<template>
  <b-container>
    <b-row class='profile-header'>
      <b-col class='avatar'>
        <b-img
          :src='this.user.image'
          alt='User avatar'
          rounded='circle'
        />
      </b-col>
      <b-col>
        <h1>
          {{this.user.username}}
        </h1>

        <p>
          <b>Bio:</b> {{this.user.bio}}
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ProfileHero',

  props: { user: {} }
}
</script>

<style scoped>
.avatar {
  max-width: 240px !important;
}

.avatar > img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  object-position: center;
}

@media only screen and (max-width: 484px) {
  .profile-header {
    text-align: center;
    justify-content: center;
  }
  div.avatar { padding-bottom: 30px }

  p { text-align: left }
}
</style>
