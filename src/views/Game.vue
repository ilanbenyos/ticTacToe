<template>
  <v-container class="home app-page">
    <h1 class="mt-5">Front App</h1>

    <h4><small>DB Status: </small>{{ dbStatus }}</h4>
    <h6 class="mb-3">options: ['init','inDb','inStore','empty']</h6>
    <div class="buttons d-flex flex-column">
      <v-btn @click="fetchAll">
        <span class="mr-2">Fetch Words</span>
      </v-btn>
      <v-btn @click="showReport" :disabled="dbStatus !== 'inDb'">
        <span class="mr-2">Show Report</span>
      </v-btn>
      <v-btn @click="emptyStore" :disabled="dbStatus !== 'inStore'">
        <span class="mr-2">Empty Store</span>
      </v-btn>
      <v-btn
        @click="emptyDb"
        :disabled="dbStatus === 'empty' || dbStatus === 'init'"
      >
        <span class="mr-2">Empty Web SQL</span>
      </v-btn>
    </div>

    <v-expansion-panel v-model="panel" class="mt-3" expand>
      <v-expansion-panel-content
        v-for="(wordArr, attr, idx) in wordsObj"
        :key="idx"
      >
        <template v-slot:header>
          <div>{{ attr }}</div>
          <small class="text-center" v-if="wordArr.length > 999"
            >(can't fetch more then 1000 words) </small
          ><small class="text-right mr-3"
            >total: {{ wordArr.length }} items</small
          >
        </template>
        <v-card>
          <v-card-text>{{ wordArr }}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    panel: []
  }),
  methods: {
    async dispatchEvent(actionStr) {
      try {
        this.$loading(true);
        await this.$store.dispatch(actionStr);
      } catch (err) {
        console.log(err);
      } finally {
        this.$loading(false);
      }
    },
    async emptyStore() {
      await this.dispatchEvent("emptyStore");
    },
    async emptyDb() {
      await this.dispatchEvent("dropAllTables");
    },
    async showReport() {
      await this.dispatchEvent("showReport");
    },
    async fetchAll() {
      await this.dispatchEvent("fetchAllFromApi");
    }
  },
  computed: {
    wordsObj() {
      return this.$store.getters["wordsObj"];
    },
    dbStatus() {
      return this.$store.getters["dbStatus"];
    },
    words() {
      return this.$store.getters["words"];
    }
  }
};
</script>

<style scoped lang="scss">
.home.app-page {
  .buttons {
    max-width: 20rem;
  }
  .word-section {
    max-height: 30vh;
  }
}
</style>
