<template>
  <v-container class="game app-page">
    <div class="inner" v-if="game">
      <h1 class="mt-5 text-center">
        Game
        <small class="mr-3">{{ game._id.substring(6, 10) }}</small>
      </h1>
      <h5 class="text-center" v-html="subTitle"></h5>
      <h5 class="text-center">{{ statusStr }}{{ endStr }}</h5>

      <div class="board-wrapper d-flex">
        <div class="board">
          <div class="board-row d-flex" v-for="(row, i) in game.board" :key="i">
            <div
              class="square"
              @click="clicked(i, j)"
              :class="{
                blink: game.winner && isBlinking('' + i + j),
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
    isBlinking(str) {
      if (!this.game) return false;
      const vArr = this.game.victoryArr;
      if (!vArr) return false;
      let mapped = vArr.map(i => "" + i[0] + i[1]);
      return mapped.includes(str);
    },
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
    endStr() {
      if (this.game.status === "ended") {
        let name = "";
        if (this.game.winner === "EVEN") {
          return "- Even";
        } else {
          if (this.user._id === this.game.winner) {
            name = "You";
          } else if (this.game.owner._id === this.game.winner) {
            name = this.game.owner.userName;
          } else {
            name = this.game.member.userName;
          }
          return `- ${name} Won!`;
        }
      }
      return "";
    },
    statusStr() {
      if (this.game.status !== "playing") {
        return `Game ${this.game.status}`;
      }
      return this.isMyTurn ? "Your turn" : "His turn";
    },
    isMyTurn() {
      return this.user._id === this.game.nextPlayer;
    },
    user() {
      return this.$store.getters["user/getMe"];
    },
    subTitle() {
      if (
        this.user._id === this.game.owner._id ||
        this.user._id === this.game.member._id
      ) {
        if (this.user._id === this.game.owner._id) {
          return ` You <small> Vs </small> ${this.game.member.userName}`;
        } else {
          return ` You <small> Vs </small> ${this.game.owner.userName}`;
        }
      }
      return ` ${this.game.owner.userName} <small> Vs </small> ${
        this.game.member.userName
      }`;
    }
  },
  watch: {
    "game.winner": function(newVal) {
      if (!this.user || !newVal) return;
      // =========IF FULL BOARD===========
      if (newVal === "EVEN") {
        this.$swal({
          text: "GAME ENDED, NO WINNER NO LOSER",
          type: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          title: "GAME ENDED!"
        });
      } else {
        // =========IF WINNER===========
        const IsWinner = this.user._id === newVal;
        const type = IsWinner ? "success" : "warning";
        this.$swal({
          text: `YOU ${IsWinner ? "WIN" : "LOSE"}`,
          type,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          title: "GAME ENDED!"
        });
      }
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
  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% {
      background-color: lightcoral;
    }
  }
}
</style>
