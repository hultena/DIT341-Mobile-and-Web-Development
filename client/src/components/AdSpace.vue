<template>
  <b-jumbotron
    header='Adspace'
    text-variant='light'
    class='ad-space'
  />
</template>

<script>
export default {
  name: 'AdSpace'
}
</script>

<style scoped>
.ad-space {
  text-align: center;
  background-image:
    linear-gradient(0deg, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .5) 100%),
    url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
  background-position: center;
}
</style>
