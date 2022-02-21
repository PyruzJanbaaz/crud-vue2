<template>
  <div class="container">
    <PageTitle v-show="!isAdminUser" :title="$t('this-is-public-page')" :bgColor="'alert-info'"/>
    <PageTitle v-show="isAdminUser" :title="$t('you-have-full-access')" :bgColor="'alert-warning'"/>
    <Users/>
  </div>
</template>

<script>
import Users from "@/components/user/Users";
import PageTitle from "@/components/PageTitle";

export default {
  name: 'Home',
  components: {PageTitle, Users},
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
