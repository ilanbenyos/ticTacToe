<template>
  <v-container class="game app-page">
    <h1 class="mt-5">Game</h1>
    <div class="board-wrapper d-flex">
      <div class="board" v-if="game">
        <div class="board-row d-flex" v-for="(row, i) in game.board" :key="i">
          <div
            class="square"
            @click="clicked(i, j)"
            :class="{ clickable: !!!square }"
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
    gameId: {}
  },
  data: () => ({}),
  async created() {
    this.$store.dispatch("game/getGame", this.gameId);
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
    })
  }
};
</script>

<style scoped lang="scss">
.game {
  .board-wrapper {
    margin: auto;
    width: 300px;
  }
  .square {
    text-align: center;
    line-height: 2;
    font-size: 50px;
    width: 100px;
    height: 100px;
    background-color: white;
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
