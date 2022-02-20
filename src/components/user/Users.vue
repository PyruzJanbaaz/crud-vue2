<template>
  <div>
    <div class="p-modal" v-if="isUpdateMode">
      <div class="row-center">
        <div class="col-md-4 col-sm-12">
          <button class="btn btn-dark btn-close-modal" @click="hideModal()">X</button>
        </div>
      </div>
      <UpdateUser @updatedUser="loadUpdatedRecord" :userId="this.currentUserId"/>
    </div>
    <div class="col-12 mt-3">
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Username</th>
          <th>Email</th>
          <th>CreateDate</th>
          <th v-if="isAdminUser">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user,index) in users" :key="index">
          <td>{{ user.id }}</td>
          <td>
            <span v-if="user.firstName === null"> - </span>
            <span v-if="user.firstName !== null"> {{ user.firstName }} </span>
          </td>
          <td>
            <span v-if="user.lastName === null"> - </span>
            <span v-if="user.lastName !== null"> {{ user.lastName }} </span>
          </td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ (user.createDate).replace('T', ' ').split('.')[0] }}</td>
          <td v-if="isAdminUser">
            <button class="btn btn-sm m-1 btn-outline-danger" @click="deleteUser(user, index)" :disabled="loading && indexClicked === index">
              <span v-show="loading && indexClicked === index" class="spinner-border spinner-border-sm"></span>
              <span>Delete</span>
            </button>
            <button class="btn btn-sm m-1 btn-outline-warning" @click="editUser(user)">
              <span>Edit</span>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <ErrorPartial v-if="message" :text="message"/>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user-service';
import UpdateUser from "@/components/user/UpdateUser";
import ErrorPartial from "@/components/error/ErrorPartial";
import EventBus from "@/common/EventBus";

export default {
  name: 'Users',
  components: {ErrorPartial, UpdateUser},
  data() {
    return {
      users: {},
      message: '',
      loading: false,
      indexClicked: NaN,
      isUpdateMode: false,
      currentUserId: 0
    };
  },
  mounted() {
    this.getUsers();
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
  },
  methods: {
    getUsers() {
      this.loading = false;
      UserService.getPublicContent().then(
          response => {
            this.users = response.data;
          },
          error => {
            this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
          }
      );
    },
    deleteUser(_user, _index) {
      this.indexClicked = _index;
      this.loading = true;
      UserService.deleteUser(_user.id).then(
          () => {
            this.getUsers();
          },
          error => {
            this.loading = false;
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
    editUser(_user) {
      this.currentUserId = _user.id;
      this.isUpdateMode = true;
    },
    loadUpdatedRecord(_updatedUser) {
      this.isUpdateMode = false;
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === _updatedUser.id) {
          this.users[i].firstName = _updatedUser.firstName;
          this.users[i].lastName = _updatedUser.lastName;
        }
      }
    },
    hideModal() {
      this.isUpdateMode = false;
    }
  }
};
</script>

