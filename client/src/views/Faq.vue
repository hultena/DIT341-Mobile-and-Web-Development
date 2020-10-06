<template>
  <b-container class='mt-5 faq-page'>

    <section>

      <b-row class='mt-5 icon-container'>
        <b-col>
          <b-icon-patch-question />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h1>
            Need help?
          </h1>
          <h2>
            Have a read through our frequently asked questions
          </h2>
        </b-col>
      </b-row>

    </section>

    <section>
      <b-row class='my-5'>
        <b-col>
          <h3>
            Search for a topic
          </h3>
          <b-input-group>
            <b-form-input
              placeholder='Type your topic here ...'
            />
            <b-input-group-append>
              <b-button
                variant='outline-primary'
              >
                <b-icon-search />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </section>

    <section></section>

  </b-container>
</template>

<script>
export default {
  name: 'faq',
  data() {
    return {}
  },
  methods: {}
}

</script>

<style scoped>
.faq-page {}
.icon-container {
  min-width: 500px;
  font-size: 8rem;
  text-align: center;
}
</style>
