<template>
  <v-container class="game-wrapper">

    <v-card outlined class="game-card">

      <v-card-title>Game</v-card-title>

      <GameCanvas class="game-canvas-wrapper" />

      <v-card-actions>
        <v-btn>Button</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { db } from "@/firestore";
import { FIRESTORE_COLLECTIONS, POKEAPI_BASE_URL, MAX_POKEMON_INDEX } from "../constants";
import firebase from "firebase/app";
import lodash from 'lodash';
import GameCanvas from './GameCanvas.vue';

@Component({
  components: {
    GameCanvas,
  }
})
export default class GameWrapper extends Vue {
  @Prop() private sessionCookie!: string;

}
</script>

<style scoped lang="less">
.game-wrapper {
  width: 600px;
}
.game-canvas-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
