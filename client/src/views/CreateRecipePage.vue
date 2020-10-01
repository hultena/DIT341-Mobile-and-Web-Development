<template>
 <div class='create-recipe-page'>
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
