<template>
  <v-container class="home">
    <v-container v-if="showAuthedState" class="game-option-buttons">
      <v-list></v-list>

      <v-btn class="full-size-button" color="success" rounded @click="newGame()">New Game</v-btn>
    </v-container>

    <v-container v-else class="username-input">
      <v-text-field
        v-model="usernameInput"
        label="Please enter a username to continue"
        placeholder="Username"
        outlined
      />
      <v-btn @click="setAndPersistUsername" color="primary">Submit</v-btn>
    </v-container>
  </v-container>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  FIRESTORE_COLLECTIONS,
  VUE_GAME_SESSION_COOKIE_STR,
  VUE_GAME_SESSION_DATA_STR
} from "@/constants";
import { db } from "@/firestore";
import firebase from "firebase/app";
import { createInitialGameboard } from "@/game-utils";

@Component({
  components: {}
})
export default class Home extends Vue {
  private showAuthedState: boolean = false;

  private sessionCookie!: string;
  private sessionData!: any;

  private usernameInput: string = "";

  mounted() {
    this.sessionCookie = this.$cookies.get(VUE_GAME_SESSION_COOKIE_STR);
    this.sessionData = this.$cookies.get(VUE_GAME_SESSION_DATA_STR);

    if (this.sessionCookie && !this.sessionData) {
      this.getSessionDataFromSessionCookie();
    } else if (!this.sessionCookie) {
      this.showAuthedState = false;
    } else {
      this.showAuthedState = true;
      this.$toast.success(`Hello ${this.sessionData.username}`);
      console.log(
        `[Home][mounted] - no need to fetch data from db, this.sessionCookie: ${
          this.sessionCookie
        }, this.sessionData: ${JSON.stringify(this.sessionData)}`
      );
    }
  }

  getSessionDataFromSessionCookie() {
    console.log(
      `[App][getSessionDataFromSessionCookie] - looking up sessionCookie: ${this.sessionCookie}`
    );
    db.collection(FIRESTORE_COLLECTIONS.SESSION_COOKIES)
      .doc(this.sessionCookie)
      .get()
      .then(snapshot => {
        this.sessionData = snapshot.data();
        console.log(
          `[App][getSessionDataFromSessionCookie] - got sessionData: ${JSON.stringify(
            this.sessionData
          )}`
        );
        if (this.sessionData) {
          this.showAuthedState = true;
          this.$toast.success(`Hello ${this.sessionData.username}`);
          this.$cookies.set(VUE_GAME_SESSION_DATA_STR, this.sessionData);
        } else {
          this.showAuthedState = false;
        }
      });
  }

  async setAndPersistUsername() {
    console.log(
      `[App][setAndPersistUsername] - username: ${this.usernameInput}`
    );

    const result = await db
      .collection(FIRESTORE_COLLECTIONS.SESSION_COOKIES)
      .add({
        username: this.usernameInput,
        createdTime: firebase.firestore.FieldValue.serverTimestamp()
      });

    console.log(
      `[App][setAndPersistUsername] - successfully added new sessionCookie entry, with id: ${result.id}`
    );
    this.sessionCookie = result.id;
    this.$cookies.set(VUE_GAME_SESSION_COOKIE_STR, this.sessionCookie);
    this.getSessionDataFromSessionCookie();
  }

  async newGame() {
    const {initialX, initialY, gameboard } = createInitialGameboard(10, 10);

    const result = await db.collection(FIRESTORE_COLLECTIONS.GAMES).add({
      createdTime: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: this.sessionCookie,
      gameboard: gameboard,
      initialX: initialX,
      initialY: initialY,
    });

    console.log(`[App][newGame] - created game entry with gameId=${result.id}`);
    this.$router.push({ path: `/games/${result.id}` });
  }
}
</script>

<style scoped lang="less">
.full-size-button {
  width: 100%;
}
</style>
