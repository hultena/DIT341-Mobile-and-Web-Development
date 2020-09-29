<template>
  <div class="settingsPage">
    <h1>
      This is the user settings page.
    </h1>
    <edit-user-form/>
  </div>
</template>

<script>
import EditUserForm from '@/forms/EditUserForm'
export default {
  name: 'mySettings',
  components: { EditUserForm }
}
</script>

<style scoped>
.settingsPage {}
</style>
