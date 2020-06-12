<template>
  <div class="game-wrapper">
    <v-dialog v-model="showNamePrompt" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Please enter a username to continue</span>
        </v-card-title>

        <v-container>
          <v-text-field v-model="usernameInput" placeholder="Username" required></v-text-field>
        </v-container>

        <v-card-actions>
          <v-btn text @click="showNamePrompt = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="closeAndSaveUsername()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VUE_GAME_SESSION_COOKIE_STR } from "../constants";

@Component
export default class GameWrapper extends Vue {
  @Prop() private socket: any;

  private showNamePrompt: boolean = false;
  private showLandingPage: boolean = false;
  private usernameInput: string = "";

  private sessionCookie: string = "";
  private username: string = "";
  private gameIds: string[] = [];

  mounted() {
    this.socket.on("getUpdatedStateForSessionCookie", (response: any) => {
      console.log(
        `[GameWrapper] [mounted] - getStateBySessionCookie_response, response: ${JSON.stringify(
          response
        )}`
      );

      this.sessionCookie = response["state"]["sessionCookie"];

      this.$cookies.set(VUE_GAME_SESSION_COOKIE_STR, this.sessionCookie);

      if (
        !response["state"]["username"] &&
        !response["state"]["gameIds"].length
      ) {
        this.showNamePrompt = true;
      } else {
        this.showLandingPage = true;
        this.username = response["state"]["username"];
        this.gameIds = response["state"]["gameIds"];
        this.$toast.success(`Hello ${this.username}!`);
      }
    });
  }

  closeAndSaveUsername() {
    console.log(
      `closeAndSaveUserthis.usernameInputname - usernameInput: ${this.usernameInput}`
    );

    if (this.usernameInput.length > 3) {
      this.showNamePrompt = false;

      this.socket.emit(
        "setUsernameForSessionCookie",
        this.sessionCookie,
        this.usernameInput
      );
    }
  }
}
</script>

<style scoped lang="less">
.game-canvas {
  border: 1px solid black;
}
</style>
