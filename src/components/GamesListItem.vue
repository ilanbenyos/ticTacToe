<template>
  <v-list-tile avatar>
    <div>{{ item.owner.userName }}</div>
    <div v-if="item.member" class="ml-2"> vs {{ item.member.userName }}</div>

    <v-spacer></v-spacer>
    <div>{{ item.status }}</div>
    <v-spacer></v-spacer>
    <v-btn flat @click="joinRequest()" v-if="canJoin" class="waiting-list h6"
      >Join This Game Now</v-btn
    >
    <v-btn
      flat
      @click="$router.push({ name: 'game', params: { gameId: item._id } })"
      v-if="canRoute"
      class="waiting-list h6"
      >GoTo Game</v-btn
    >
  </v-list-tile>
</template>

<script>
export default {
  name: "GamesListItem",
  props: {
    item: { type: Object, required: true }
  },
  computed: {
    userId() {
      return this.$store.getters["user/userId"];
    },
    isInWaitingList() {
      return (
        this.item.waitingList.findIndex(item => item._id === this.userId) > -1
      );
    },
    canRoute() {
      if (this.item.status !== "playing") return false;
      return (
        this.item.owner._id === this.userId ||
        this.item.member._id === this.userId
      );
    },
    canJoin() {
      if (this.item.status === "init") return true;
      if (this.item.status === "waitingList" && this.isInWaitingList)
        return true;
      return false;
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
    async joinRequest() {
      await this.dispatchEvent("game/joinRequest", this.item._id);
    }
  }
};
</script>

<style scoped></style>
