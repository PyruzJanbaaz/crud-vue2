<template>
  <div class="container" v-if="pageIsLoaded">
    <div class="row-center">
      <div class="col-md-5 col-sm-12">
        <PageTitle :title="content" :bgColor="'alert-info'"/>
        <div class="card card-container mt-1">
          <div class="card-header">
            <h4 class="text-center">
              {{ $t('changePassword') }}
            </h4>
          </div>
          <form name="form" @submit.prevent="handleChangePassword">
            <div class="form-group form-validate-input">
              <label for="oldPassword">
                {{ $t('oldPassword') }}
              </label>
              <input
                  v-model="changePass.oldPassword"
                  v-validate="'required'"
                  type="password"
                  class="form-control"
                  name="oldPassword"
                  id="oldPassword"
              />
              <div v-if="errors.has('oldPassword')" class="alert alert-danger" role="alert">Old password is required!
              </div>
            </div>
            <div class="form-group form-validate-input">
              <label for="password">
                {{ $t('newPassword') }}
              </label>
              <input
                  v-model="changePass.password"
                  v-validate="'required'"
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
              />
              <div v-if="errors.has('password')" class="alert alert-danger" role="alert">Password is required!</div>
            </div>
            <div class="form-group form-validate-input">
              <label for="confirmPassword">
                {{ $t('confirmPassword') }}
              </label>
              <input
                  v-model="changePass.confirmPassword"
                  v-validate="'required'"
                  type="password"
                  class="form-control"
                  name="confirmPassword"
                  id="confirmPassword"
              />
              <div v-if="errors.has('confirmPassword')" class="alert alert-danger" role="alert">Confirm password is
                required!
              </div>
            </div>
            <div class="form-group text-center">
              <button class="btn btn-link m-1" @click='resetForm' type="reset">
                {{ $t('btn.reset') }}
              </button>
              <button class="btn btn-warning" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>
                  {{ $t('btn.update') }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user-service';
import PageTitle from "@/components/PageTitle";
import ChangePassUser from "@/models/change-pass-user";
import EventBus from "@/common/EventBus";

export default {
  name: 'User',
  components: {PageTitle},
  data() {
    return {
      content: '',
      changePass: new ChangePassUser('', '', ''),
      pageIsLoaded: false,
      loading: false,
    };
  },
  mounted() {
    UserService.getUserMessage().then(
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
  },
  methods: {
    resetForm() {
      this.changePass.oldPassword = '';
      this.changePass.password = '';
      this.changePass.confirmPassword = '';
    },
    handleChangePassword() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.loading = true;
          UserService.changePassword(this.changePass).then(
              res => {
                this.successful = true;
                this.$toasted.show(res.data.message);
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
              },
              error => {
                this.successful = false;
                this.loading = false;
                this.$toasted.show(
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString()
                );
                if (error.response && error.response.status === 403) {
                  EventBus.dispatch("logout");
                }
              }
          );
        }
      });
    }
  }
};
</script>
