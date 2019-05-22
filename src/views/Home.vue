<template>
  <v-container class="back-app app-page">
    <h2 class="mb-4">Home</h2>
      <v-flex xs12 sm6 md3 mb-4>
          <v-text-field
                  label="User Name"
                  placeholder="please enter your user name"
          ></v-text-field>
      </v-flex>
    <div class="buttons d-flex flex-column">
      <v-btn @click="submit">
        <span class="mr-2">Submit</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    userName: ""
  }),
  methods: {
    async submit() {
      try {
        this.$loading(true);
        return await this.$store.dispatch(`user/submit`, this.userName);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    }
  },
  computed: {

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
