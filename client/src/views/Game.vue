<template>
  <v-container class="game">
    <div v-if="!loading">
      <gameboard :gameboard="gameData.gameboard" :targetX="targetX" :targetY="targetY" />
    </div>
  </v-container>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  FIRESTORE_COLLECTIONS,
  VUE_GAME_SESSION_COOKIE_STR,
  VUE_GAME_SESSION_DATA_STR,
  GAMEBOARD_CELL_DATA_TYPES
} from "@/constants";
import { db } from "@/firestore";
import firebase from "firebase/app";
import Gameboard from "@/components/Gameboard.vue";
import { calculateNewPosition } from "@/game-utils";

@Component({
  components: {
    Gameboard
  }
})
export default class Game extends Vue {
  private sessionCookie!: string;
  private sessionData!: any;
  private loading: boolean = true;

  private gameData: any = {};
  private targetX: number = 0;
  private targetY: number = 0;

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
        this.targetX = this.gameData.initialX;
        this.targetY = this.gameData.initialY;

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
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        this.handleMovement(e.keyCode);
      }
    });
  }

  handleMovement(keyCode: number) {
    let newX = this.targetX;
    let newY = this.targetY;

    if (keyCode === 37) {
      console.log(`[Game][moveLeft]`);
      newY = calculateNewPosition(
        this.targetY,
        -1,
        Object.keys(this.gameData.gameboard).length
      );
    } else if (keyCode === 38) {
      console.log(`[Game][moveUp]`);
      newX = calculateNewPosition(
        this.targetX,
        -1,
        Object.keys(this.gameData.gameboard).length
      );
    } else if (keyCode === 39) {
      console.log(`[Game][moveRight]`);
      newY = calculateNewPosition(
        this.targetY,
        1,
        Object.keys(this.gameData.gameboard).length
      );
    } else if (keyCode === 40) {
      console.log(`[Game][moveDown]`);
      newX = calculateNewPosition(
        this.targetX,
        1,
        Object.keys(this.gameData.gameboard).length
      );
    }

    if (!this.gameData.gameboard[newX][newY].data.type) {
      // empty cell, move in freely
      return;
    }

    if (
      this.gameData.gameboard[newX][newY].data.type ===
      GAMEBOARD_CELL_DATA_TYPES.BLOCKER
    ) {
      // can't move; stay where you are
      return;
    }

    if (
      this.gameData.gameboard[newX][newY].data.type ===
      GAMEBOARD_CELL_DATA_TYPES.POWER_UP
    ) {
      // move in, add powerup to list (need to show UI too)
    }

    if (
      this.gameData.gameboard[newX][newY].data.type ===
      GAMEBOARD_CELL_DATA_TYPES.POKEMON
    ) {
      // start pokemon battle, winner stays
    }

    const targetUrl = this.gameData.gameboard[this.targetX][this.targetY].data
      .url;
    this.gameData.gameboard[this.targetX][this.targetY].data.url = "";
    this.gameData.gameboard[this.targetX][this.targetY].data.url = targetUrl;
  }
}
</script>

<style scoped lang="less">
</style>
