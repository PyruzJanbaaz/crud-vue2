<template>
  <div class="container" v-if="pageIsLoaded">
    <PageTitle :title="content" :bgColor="'alert-info'"/>
    <Users />
  </div>
</template>
<script>
import UserService from '../services/user-service';
import Users from "@/components/user/Users";
import PageTitle from "@/components/PageTitle";
import EventBus from "@/common/EventBus";

export default {
  name: 'Admin',
  components: {PageTitle, Users},
  data() {
    return {
      content: '',
      pageIsLoaded : false
    };
  },
  mounted() {
    UserService.getAdminMessage().then(
        response => {
          this.content = response.data;
          this.pageIsLoaded = true;
        },
        error => {
          if (error.response && error.response.status === 403) {
            EventBus.dispatch("logout");
          }
        }
    );
  }
};
</script>
