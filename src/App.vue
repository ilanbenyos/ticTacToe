<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>CELLXPERT</span>
        <span class="font-weight-light">- DATA MUZE API</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <router-link :to="{name:'FrontApp'}" class="ml-2">Front</router-link>
        <router-link :to="{name:'BackApp'}" class="ml-2" >Back</router-link>
        <router-link to="/about" class="ml-2">About Ilan</router-link>

    </v-toolbar>
    <router-view></router-view>
    <transition name="fade">
        <div class="loader w-100 h-100 " v-if="isLoading"></div>
    </transition>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  },
    async mounted(){
        this.$store.dispatch('initDB')
    },
    computed:{
      isLoading(){return this.$store.getters.isLoading}
    }
}
</script>
<style lang="scss">
    .app-page {
        height: 90vh;
        margin-top: 5rem;
    }
    .loader{
        z-index:2;
        background-color: #4e555b;
        opacity:.8;
        position: absolute;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .router-link-exact-active.router-link-active{
        color:lightseagreen;
    }
</style>
