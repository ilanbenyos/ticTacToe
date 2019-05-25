<template>
  <div class="loader" @click.stop="close">
    <img class="spiner" src="../../dist/images/loader.svg" />
  </div>
</template>
<script>
export default {
  name: "loader",

  methods: {
    close() {
      this.$emit("close-loader");
    }
  }
};
</script>
<style lang="scss" scoped>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  .spiner {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 20%;
    height: 20%;
  }
}
</style>
