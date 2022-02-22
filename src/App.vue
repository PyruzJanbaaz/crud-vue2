<template>
  <div id="app">
    <nav class="navbar navbar-expand border-bottom">
      <img class="logo" src="./assets/images/logo.png"/>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Home' })" class="nav-link">
            <i class="ri-home-4-fill"></i>
            {{ $t('menu.home') }}
          </router-link>
        </li>
        <li v-if="showAdminPage" class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Admin' })" class="nav-link">
            <i class="ri-admin-fill"></i>
            {{ $t('menu.admin') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" :to="$i18nRoute({ name: 'User' })" class="nav-link">
            <i class="ri-user-3-fill"></i>
            {{ $t('menu.user') }}
          </router-link>
        </li>
      </ul>


      <ul v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Register' })" class="nav-link">
            <i class="ri-user-add-fill"></i>
            {{ $t('menu.register') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Login' })" class="nav-link">
            <i class="ri-login-box-fill"></i>
            {{ $t('menu.login') }}
          </router-link>
        </li>
      </ul>

      <ul v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="$i18nRoute({ name: 'Profile' })" class="nav-link">
            <i class="ri-user-2-fill"></i>
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logout">
            <i class="ri-logout-box-fill"></i>
            {{ $t('menu.logout') }}
          </a>
        </li>
      </ul>
      <LocaleSwitcher/>

    </nav>

    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";
import AuthService from './services/auth-service';
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { i18n } from './i18n';

export default {
  components: {LocaleSwitcher},
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
      AuthService.userLogout().finally(() => {
        this.$store.dispatch('auth/logout');
        this.$router.push('/'+i18n.locale +'/login');
      });
    }
  },
  beforeDestroy() {
    EventBus.remove("logout");
  }
};
</script>
