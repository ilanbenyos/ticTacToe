<template>
  <v-container class="game app-page">
    <h1 class="mt-5 text-center">
      Game
      <small class="mr-3" v-if="game">{{ game._id.substring(6, 10) }}</small>
    </h1>
    <h5 v-if="game" class="text-center">
      You <small> Vs </small>{{ playerName }}
    </h5>
    <h5 v-if="game" class="text-center">
      {{ statusStr }}
    </h5>

    <div class="board-wrapper d-flex">
      <div class="board" v-if="game">
        <div class="board-row d-flex" v-for="(row, i) in game.board" :key="i">
          <div
            class="square"
            @click="clicked(i, j)"
            :class="{
              clickable: !!!square && isMyTurn && game.status == 'playing'
            }"
            v-for="(square, j) in row"
            :key="j"
          >
            {{ square }}
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Game",
  props: {
    gameId: { type: String, required: true }
  },
  data: () => ({
    dialog: false
  }),
  async created() {
    this.$store.dispatch("game/getGame", this.$route.params.gameId);
  },
  methods: {
    async clicked(i, j) {
      let obj = {
        square: [i, j],
        gameId: this.gameId
      };
      await this.$store.dispatch("game/clicked", obj);
    },
    async dispatchEvent(actionStr) {
      try {
        this.$loading(true);
        await this.$store.dispatch(actionStr);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    }
  },
  computed: {
    ...mapGetters("game", {
      game: "getGame"
    }),
    statusStr() {
      if (this.game.status !== "playing") {
        return this.game.status;
      }
      return this.isMyTurn ? "Your turn" : "His turn";
    },
    isMyTurn() {
      return this.user._id === this.game.nextPlayer;
    },
    user() {
      return this.$store.getters["user/getMe"];
    },
    playerName() {
      if (this.user._id === this.game.owner._id) {
        return this.game.member.userName;
      }
      return this.game.owner.userName;
    }
  },
  watch: {
    "game.winner": function(newVal) {
      this.$swal({
        text: `YOU ${this.user._id === newVal ? "WIN" : "LOSE"}`,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        title: "GAME ENDED!"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.game {
  .board-wrapper {
    margin: auto;
    width: 330px;
  }
  .square {
    text-align: center;
    line-height: 2;
    font-size: 50px;
    width: 100px;
    height: 100px;
    background-color: lightblue;
    transition: all 0.5s;
    margin: 5px;
    border-radius: 10px;
    pointer-events: none;
    &:hover {
      background-color: gray;
    }
    &.clickable {
      cursor: pointer;
      pointer-events: initial;
    }
    img {
      width: calc(100% - 1px);
    }
  }
}
</style>
