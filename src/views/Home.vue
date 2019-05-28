<template>
  <v-container class="back-app app-page">
    <h2 class="mb-4">Home</h2>
      <v-form v-if="!isLogged">
        <v-flex xs12 sm6 md3 mb-4>
      <v-text-field
        v-model="userName"
        label="User Name"
        placeholder="please enter your user name"
      ></v-text-field>
    </v-flex>
        <v-flex xs12 sm6 md3 mb-4>
      <v-text-field
        v-model="password"
        label="User Password"
        placeholder="please enter your Password"
      ></v-text-field>
    </v-flex>
      </v-form>
    <div class="buttons d-flex flex-column">
      <v-btn @click="register" v-if="!isLogged">
        <span class="mr-2">Register</span>
      </v-btn>
      <v-btn @click="login"  v-if="!isLogged">
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn @click="logout"  v-if="isLogged">
        <span class="mr-2">Logout</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    password: "",
    userName: ""
  }),
  methods: {
    async register() {
      try {
        this.$loading(true);
        let obj = { userName: this.userName, password: this.password };
        await this.$store.dispatch(`user/register`, obj);
        this.$toast("Registered Successfully");
        this.$router.push({ name: "games" });
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async login() {
      try {
        this.$loading(true);
        let obj = { userName: this.userName, password: this.password };
        await this.$store.dispatch(`user/login`, obj);
        this.$toast("Login Successfully");
        this.$router.push({ name: "games" });
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async logout() {
      try {
        this.$loading(true);
        await this.$store.dispatch("user/logout");
        this.$toast("Logout Successfully");
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters["user/isLogged"];
    }
  }
};
</script>

<style scoped lang="scss">
.back-app.app-page {
  .buttons {
    max-width: 20rem;
  }
  .word-section {
    max-height: 30vh;
  }
}
</style>
