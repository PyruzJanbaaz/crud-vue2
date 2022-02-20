<template>
  <div class="container">
    <PageTitle v-show="!isAdminUser" :title="content" :bgColor="'alert-info'"/>
    <PageTitle v-show="isAdminUser" :title="'You are logged in as an ADMIN, Now you have full access permission!'" :bgColor="'alert-warning'"/>
    <Users/>
  </div>
</template>

<script>
import Users from "@/components/user/Users";
import PageTitle from "@/components/PageTitle";

export default {
  name: 'Home',
  components: {PageTitle, Users},
  data() {
    return {
      content: 'This is a public page and it\'s accessible for all viewers!'
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdminUser() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    }
  }
};
</script>
