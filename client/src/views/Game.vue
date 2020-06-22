<template>
  <v-container class="game">
    <div v-if="!loading">
      <gameboard :data="gameData.gameboard" />
    </div>
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
import Gameboard from "@/components/Gameboard.vue";

@Component({
  components: {
    Gameboard
  }
})
export default class Game extends Vue {
  private sessionCookie!: string;
  private sessionData!: any;
  private loading: boolean = true;
  private gameData!: any; // from db

  constructor() {
    super();
    this.sessionCookie = this.$cookies.get(VUE_GAME_SESSION_COOKIE_STR);
    this.sessionData = this.$cookies.get(VUE_GAME_SESSION_DATA_STR);
  }

  mounted() {
    console.log(`[Game][mounted] - ${this.$route.params.gameId}`);

    db.collection(FIRESTORE_COLLECTIONS.GAMES)
      .doc(this.$route.params.gameId)
      .get()
      .then(snapshot => {
        this.gameData = snapshot.data();

        if (this.gameData) {
          this.loading = false;
          console.log(
            `[Game][mounted] - retrieved gameData from db: ${JSON.stringify(
              this.gameData.gameboard
            )}`
          );
        } else {
          console.log(
            `[Game][mounted] - ERROR unable to find game with id: ${this.$route.params.gameId}`
          );
        }
      });

    window.addEventListener("keydown", e => {
      console.log(`[Game][mounted] - ${e.keyCode}`);
      if (e.keyCode === 37) {
        // left
        this.moveLeft();
      } else if (e.keyCode === 38) {
        // up
        this.moveUp();
      } else if (e.keyCode === 39) {
        // right
        this.moveRight();
      } else if (e.keyCode === 40) {
        // down
        this.moveDown();
      }
    });
  }

  moveLeft() {
    console.log(`[Game][moveLeft]`);
  }

  moveUp() {
    console.log(`[Game][moveUp]`);
  }

  moveRight() {
    console.log(`[Game][moveRight]`);
  }

  moveDown() {
    console.log(`[Game][moveDown]`);
  }
}
</script>

<style scoped lang="less">
</style>
