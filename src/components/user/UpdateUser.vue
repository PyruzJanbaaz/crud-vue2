<template>
  <div class="row-center">
    <div class="col-md-4 col-sm-12">
      <div class="card card-container">
        <div class="alert alert-warning">

          {{$t('you-are-editing-user')}}: <span>{{ user.username }}</span></div>
        <form name="form" @submit.prevent="handleUpdateUser">
          <div class="form-group form-validate-input">
            <label for="firstName">
              {{$t('firstName')}}
            </label>
            <input
                v-model="user.firstName"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="firstName"
                id="firstName"
            />
            <div v-if="submitted && errors.has('firstName')" class="alert-danger">{{ errors.first('firstName') }}</div>
          </div>
          <div class="form-group form-validate-input">
            <label for="lastName">
              {{$t('lastName')}}
            </label>
            <input
                v-model="user.lastName"
                v-validate="'required|min:3|max:50'"
                type="text"
                class="form-control"
                name="lastName"
                id="lastName"
            />
            <div v-if="submitted && errors.has('lastName')" class="alert-danger">{{ errors.first('lastName') }}</div>
          </div>
          <div class="form-group text-center">
            <button class="btn btn-link m-1" @click='resetForm' type="reset">
              {{$t('btn.reset')}}
            </button>
            <button class="btn btn-warning" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>
                {{$t('btn.update')}}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import EventBus from "@/common/EventBus";

export default {
  name: "UpdateUser",
  props: ['userId'],
  data() {
    return {
      submitted: false,
      successful: false,
      loading: false,
      user: {}
    };
  },
  computed: {},
  mounted() {
    this.getUserById();
  },
  methods: {
    getUserById() {
      UserService.getUserById(this.userId).then(
          res => {
            this.user = res.data
          },
          error => {
            this.successful = false;
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response && error.response.status === 403) {
              EventBus.dispatch("logout");
            }
          }
      );
    },
    resetForm() {
      this.user.firstName = '';
      this.user.lastName = '';
    },
    handleUpdateUser() {
      this.message = '';
      this.submitted = true;
      this.loading = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          UserService.updateUser(this.user).then(
              res => {
                this.successful = true;
                this.$emit('updatedUser', this.user);
                this.$toasted.show(res.data.message);
              },
              error => {
                this.successful = false;
                this.loading = false;
                this.message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    }
  }
};
</script>

}
