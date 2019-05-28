<template>
  <v-list-tile avatar>
    <small v-if="item" class="mr-3">{{ item._id | gameName }}</small>
    <div>{{ item.owner.userName }}</div>
    <div v-if="item.member" class="ml-2">vs {{ item.member.userName }}</div>

    <v-spacer></v-spacer>
    <div>{{ statusStr }}</div>
    <v-spacer></v-spacer>
    <v-btn flat @click="joinRequest()" v-if="canJoin" class="waiting-list h6"
      >Ask TO Join</v-btn
    >
    <v-btn
      flat
      @click="$router.push({ name: 'game', params: { gameId: item._id } })"
      v-if="canRoute"
      class="waiting-list h6"
      >GoTo Game</v-btn
    >
    <v-menu open-on-hover offset-y v-if="waitingSelect">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
          Join Requests
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(i, index) in item.waitingList"
          :key="index"
          @click="selectWaitingList(index)"
        >
          <v-list-tile-title>{{ i.userName }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn
      icon
      @click="$store.dispatch('game/deleteGame', item._id)"
      class="waiting-list h6"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-list-tile>
</template>

<script>
export default {
  name: "GamesListItem",
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    waitingSelect() {
      if (this.item.status !== "waiting") return false;
      if (this.item.owner._id == this.userId) return true;
      return false;
    },
    statusStr() {
      const game = this.item;
      if (this.item.status === "ended") {
        if (game.winner === 'EVEN') {
            return "Even";
        }else{
          let winnerName =
            game.winner === game.owner._id
              ? game.owner.userName
              : game.member.userName;
          return `${winnerName} won`;
        }
      }
      return `Game ${this.item.status}`
    },
    userId() {
      return this.$store.getters["user/userId"];
    },
    isInWaitingList() {
      return (
        this.item.waitingList.findIndex(item => item._id === this.userId) > -1
      );
    },
    canRoute() {
      if (this.item.status == "waiting") return false;
      if (this.item.status == "init") return false;
      return true;
    },
    canJoin() {
      if (this.item.owner._id === this.userId) return false;
      if (this.item.status === "init") return true;
      // if (this.item.status === "waiting" && !this.isInWaitingList) return true;
      if (this.item.status === "waiting") return true;
      return false;
    }
  },
  methods: {
    async selectWaitingList(idx) {
      let memberId = this.item.waitingList[idx]._id;
      let obj = { memberId, gameId: this.item._id };
      await this.dispatchEvent("game/startGame", obj);
    },
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
    async joinRequest() {
      await this.dispatchEvent("game/joinRequest", this.item._id);
    }
  }
};
</script>

<style scoped></style>
