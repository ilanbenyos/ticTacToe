<template>
  <div class="overlay-manager">
    <v-dialog class="loader" v-model="loader.isLoader" persistent>
      <v-progress-circular
        :size="80"
        :width="8"
        indeterminate
        color="red"
      ></v-progress-circular>
    </v-dialog>
    <transition name="fade"> </transition>
  </div>
</template>
<script>
import Vue from "vue";

export default {
  name: "overlay-manager",
  created() {
    Vue.prototype.$toast = this.toast;
    Vue.prototype.$loader = this.loader;
  },

  data() {
    return {
      loader: {
        isLoader: false,
        open: this.loaderOpen,
        close: this.loaderClose
      }
    };
  },
  watch: {},
  methods: {
    toast(txt) {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        text: txt
      });
    },
    loaderOpen() {
      this.loader.isLoader = true;
    },
    loaderClose() {
      this.loader.isLoader = false;
    }
  },
  components: {}
};
</script>
<style lang="scss">
.v-dialog {
  .v-progress-circular {
    height: 80px;
    width: 80px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

<style lang="scss" scoped>
.overlay-manager {
}
</style>
