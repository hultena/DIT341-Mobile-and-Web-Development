<template>
 <div class='create-recipe-page'>
   <b-container>
     <b-row>
       <b-col>
         <h1>
           Create a new recipe
         </h1>
       </b-col>
     </b-row>
   </b-container>
   <CreateRecipeForm />
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
