<template>
  <div class='about-page'>

    <b-img
      src='https://images.unsplash.com/photo-1528712306091-ed0763094c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80'
      class=''
    />

    <b-container class='mb-5'>
      <section class='my-5'>
        <b-row>
          <b-col>
            <h1>
              About Yummy
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </b-col>
        </b-row>

      </section>

      <section class='developers mb-5'>

        <b-row class='mb-3'>
          <b-col>
            <h2>
              About the developers
            </h2>
          </b-col>
        </b-row>

        <b-row>
          <b-col class='developer mb-4'>
            <b-card>
              <b-img
                src='https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                rounded='circle'
                center
                alt='Developer profile'
                class='my-4'
              />
              <h3>Developer name</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </b-card>
          </b-col>
          <b-col class='developer mb-4'>
            <b-card>
              <b-img
                src='https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                rounded='circle'
                center
                alt='Developer profile'
                class='my-4'
              />
              <h3>Developer name</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </b-card>
          </b-col>
        </b-row>
      </section>
    </b-container>

  </div>
</template>

<script>
export default {
  name: 'about',

  methods: { toTop() { window.scrollTo(0, 0) } },

  mounted() { this.toTop() }
}
</script>

<style scoped>
.about-page > img:first-child {
  height: 30vh;
  width: 100vw;
  object-fit: cover;
  object-position: center;
}
section.developers img {
  height: 200px;
  width: 200px;
  text-align: center;
}
.developer {
  min-width: 300px
}
</style>
