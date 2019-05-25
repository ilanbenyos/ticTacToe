<template>
  <v-container class="games app-page">
    <div class="d-flex flex-center flex-column">
      <v-card class="card">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>RazorGrip League</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="$store.dispatch('games/fetchGames')">
                <v-icon>refresh</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list>
          <games-list-item
            v-for="item in initialGames"
            :item="item"
            :key="item._id"
          >
          </games-list-item>
        </v-list>
      </v-card>
      <v-btn @click="initGame" class="mt-4 col-md-6 col-lg-3 col-sm-12">
        Or Create new Game
        <v-icon class="ml-2">add</v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import GamesListItem from "../components/GamesListItem";
export default {
  name: "Games",
  components: { GamesListItem },
  data: () => ({}),
  async created() {
    if (this.$store.getters["user/isLogged"]) {
      await this.dispatchEvent("games/fetchGames");
    }
  },
  methods: {
    async dispatchEvent(actionStr, data) {
      try {
        this.$loading(true);
        await this.$store.dispatch(actionStr, data);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async initGame() {
      await this.dispatchEvent("game/initGame");
    }
  },
  computed: {
    initialGames() {
      return this.$store.getters["games/initialGames"];
    },
    user() {
      return this.$store.getters["user/getMe"];
    },
    myGames() {
      return this.user.myGames;
    }
  }
};
</script>

<style scoped lang="scss">
.games {
  .card {
    max-width: 60rem;
  }
}
</style>
