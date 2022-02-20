<template>
  <div id="app">
    <nav class="navbar navbar-expand border-bottom">
      <img src="./assets/images/logo.png"/>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <i class="ri-home-4-fill"></i>
            Home
          </router-link>
        </li>
        <li v-if="showAdminPage" class="nav-item">
          <router-link to="/admin" class="nav-link">
            <i class="ri-admin-fill"></i>
            Admin
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">
            <i class="ri-user-3-fill"></i>
            User
          </router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <i class="ri-user-add-fill"></i>
            Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <i class="ri-login-box-fill"></i>
            Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <i class="ri-user-2-fill"></i>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logout">
            <i class="ri-logout-box-fill"></i>
            Logout
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminPage() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }
      return false;
    }
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logout();
    });
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
</script>
