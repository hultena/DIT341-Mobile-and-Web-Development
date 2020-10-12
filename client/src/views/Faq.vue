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
          <b-form-group>
            <b-form-input
              v-model='search'
              placeholder='Type your topic here ...'
            />
          </b-form-group>
        </b-col>
      </b-row>
    </section>

    <section class='my-b'>
      <div
        v-for='(question, index) in filteredQuestions'
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

  computed: {
    filteredQuestions: function () {
      return this.questions.filter((question) => {
        return question.q.toLowerCase().match(this.search)
      })
    }
  },

  methods: { toTop() { window.scrollTo(0, 0) } },

  mounted() { this.toTop() },

  data() {
    return {
      search: '',
      questions: [
        {
          q: 'How to delete a recipe',
          a: 'In order to delete your recipe, you have to go to the \'edit page\' for that specific recipe. You will find the recipe delete button in the bottom of the page, in the \'Danger zone\'. Remember that a recipe can\'t be restored once it\'s gone.'
        },
        {
          q: 'What does the heart mean?',
          a: 'When you click or tap a recipe heart, it adds that recipe to your favourites so that you can find it later. Go to your profile and click \'My favourite recipes\' up in the header to see all your saved recipes.'
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
  }
}

</script>

<style scoped>
.faq-page { padding: 100px 0 50px 0 }
.faq-page > section:first-child { padding-bottom: 50px }
.icon-container {
  min-width: 500px;
  font-size: 8rem;
  text-align: center;
}
h1, h4 { text-align: center }
</style>
