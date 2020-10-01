<template>
 <div class='create-recipe-page'>
   <b-container class='my-5'>
     <b-row class='mb-5'>
       <b-col>
         <h1>
           Create a new recipe
         </h1>
         <h5>
           Fill in the information required in the form below to create your new recipe.
         </h5>
       </b-col>
     </b-row>
     <b-row>
       <b-col>
         <CreateRecipeForm />
       </b-col>
     </b-row>
   </b-container>
 </div>
</template>

<script>
import CreateRecipeForm from '@/forms/CreateRecipeForm/CreateRecipeForm'

export default {
  name: 'CreateRecipePage',
  components: { CreateRecipeForm }
}
</script>

<style scoped>

</style>
