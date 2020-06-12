<template>
  <v-app class="app-wrapper">
    <v-app-bar app color="primary">
      <v-toolbar-title>Random Pokemon Battle</v-toolbar-title>
    </v-app-bar>

      <v-content app>
        <game-wrapper :socket="socket" />
      </v-content>

    <v-footer app>
      <div>&copy; YayLinda {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GameWrapper from "@/components/GameWrapper.vue";
import io from "socket.io-client";
import { VUE_GAME_SESSION_COOKIE_STR } from "./constants";
// import store from './store';

@Component({
  components: {
    GameWrapper
  }
})
export default class App extends Vue {
  private host: string = process.env.VUE_APP_SOCKET_HOST;
  private socket: any;

  created() {
    console.log(`[App] [created] - socketHost: ${this.host}`);
    this.socket = io(this.host);
  }

  mounted() {
    console.log(`[App] [mounted]`);

    const sessionCookie = this.$cookies.get(VUE_GAME_SESSION_COOKIE_STR);

    this.socket.emit("getStateBySessionCookie", sessionCookie);

    console.log(
      `[App] [mounted] - emitted 'getStateBySessionCookie' with sessionCookie=${sessionCookie}`
    );
  }
}
</script>

<style lang="less">
.app-wrapper {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100;
}
</style>
