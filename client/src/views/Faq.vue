<template>
  <b-container class='my-5 faq-page'>

    <section>

      <b-row class='mt-5 icon-container'>
        <b-col>
          <b-icon-patch-question />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <h1>
            Frequently asked questions
          </h1>
          <h4>
            Have a read to find the answers to your questions
          </h4>
        </b-col>
      </b-row>

    </section>

    <section class='my-5'>
      <b-row>
        <b-col>
          <h2>
            Search for a topic
          </h2>
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

    <section class='my-b'>
      <div
        v-for='(question, index) in questions'
        :key='index'
        class='my-5'
      >
        <b-row>
          <b-col>
            <b-card>
              <h3>
                <b-icon-question-circle-fill class='mr-3'/> {{ question.q }}
              </h3>
              <p>
                {{ question.a }}
              </p>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>

  </b-container>
</template>

<script>
export default {
  name: 'faq',
  data() {
    return {
      questions: [
        {
          q: 'How to delete a recipe',
          a: 'In order to delete your recipe, you have to go to the \'edit page\' for that specific recipe. You will find the recipe delete button in the bottom of the page, in the \'Danger zone\'. Remember that a recipe can\'t be restored once it\'s gone.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        {
          q: 'Lorem ipsum dolor sit amet',
          a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        }
      ]
    }
  },
  methods: {}
}

</script>

<style scoped>
h1, h4 { text-align: center }
.faq-page {}
.icon-container {
  min-width: 500px;
  font-size: 8rem;
  text-align: center;
}
</style>
