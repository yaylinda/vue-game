<template>
  <v-app class="app">

    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Random Pokemon Battle</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <game-wrapper :socket="socket"/>
    </v-content>

    <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; YayLinda {{ new Date().getFullYear() }}</div>
  </v-footer>

  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameWrapper from '@/components/GameWrapper.vue';
import io from 'socket.io-client';
import { VUE_GAME_SESSION_STR } from './constants';

@Component({
  components: {
    GameWrapper,
  },
})
export default class App extends Vue {

  private host: string = process.env.VUE_APP_SOCKET_HOST;
  private socket: any;
  private vueGameCookie: string;

  created() {
    console.log(`[App] - created`);

    // TODO - enable this later
    // this.socket = io(this.host);

    this.vueGameCookie = this.$cookies.get(VUE_GAME_SESSION_STR);
    if (!this.vueGameCookie) {
      this.vueGameCookie = 
    }
  }

  mounted() {
    console.log(`[App] - mounted`);

  }
}
</script>

<style lang="less">

.app {
  overflow: hidden;
}

</style>
