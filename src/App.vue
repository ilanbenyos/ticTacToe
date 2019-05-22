<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>RAZORGRIP </span>
        <span class="font-weight-light">- TIC-TAC-TOE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'home' }" class="ml-2">Home</router-link>
      <router-link :to="{ name: 'game' }" class="ml-2">Game</router-link>
      <router-link :to="{ name: 'about' }" class="ml-2">About Ilan</router-link>
    </v-toolbar>
    <router-view></router-view>
    <transition name="fade">
      <div class="loader w-100 h-100 " v-if="isLoading"></div>
    </transition>
    <overlay-manager></overlay-manager>
  </v-app>
</template>

<script>
import overlayManager from "./components/partials/overlayManager";
export default {
  name: "App",
  components: { overlayManager },
  data() {
    return {
      //
    };
  },
  beforeCreate() {
    window.vue = this;
  },

  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
<style lang="scss">
.app-page {
  height: 90vh;
  margin-top: 5rem;
}
.loader {
  z-index: 2;
  background-color: #4e555b;
  opacity: 0.8;
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.router-link-exact-active.router-link-active {
  color: lightseagreen;
}
</style>
