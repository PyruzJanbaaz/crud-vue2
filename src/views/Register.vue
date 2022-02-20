<template>
  <div class="row-center">
    <div class="col-md-5 col-sm-12">
      <div class="card card-container">
        <img class="card-logo" src="../assets/images/logo.png"/>
        <form name="form" @submit.prevent="handleRegister">
          <div v-if="!successful">
            <div class="form-group form-validate-input">
              <label for="username">Username</label>
              <input
                  v-model="user.username"
                  v-validate="'required|min:3|max:20'"
                  type="text"
                  class="form-control"
                  name="username"
                  id="username"
              />
              <div v-if="submitted && errors.has('username')" class="alert-danger">{{ errors.first('username') }}</div>
            </div>
            <div class="form-group form-validate-input">
              <label for="email">Email</label>
              <input
                  v-model="user.email"
                  v-validate="'required|email|max:50'"
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
              />
              <div v-if="submitted && errors.has('email')" class="alert-danger">{{ errors.first('email') }}</div>
            </div>
            <div class="form-group form-validate-input">
              <label for="password">Password</label>
              <input
                  v-model="user.password"
                  v-validate="'required|min:6|max:40'"
                  type="password"
                  class="form-control"
                  name="password"
                  id="password"
              />
              <div v-if="submitted && errors.has('password')" class="alert-danger">{{ errors.first('password') }}</div>
            </div>
            <div class="form-group text-center">
              <button class="btn btn-link m-1" @click='resetForm' type="reset">Reset</button>
              <button class="btn btn-success">Register</button>
            </div>
          </div>
        </form>
        <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NewUser from '../models/new-user';

export default {
  name: 'Register',
  data() {
    return {
      user: new NewUser('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    resetForm() {
      this.user.username = '';
      this.user.password = '';
      this.user.email = '';
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
              },
              error => {
                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          );
        }
      });
    }
  }
};
</script>
