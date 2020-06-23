<template>
  <v-container class="gameboard">
    <div class="grid">
      <div class="row" v-for="(row, rowIndex) in data" :key="rowIndex">
        <div
          class="cell"
          v-for="(cell, colIndex) in row"
          :key="colIndex"
        >
          <div class="cell-content">
            <div>
              <img class="pokemon-sprite" v-if="cell.url" :src="cell.url" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { db } from "@/firestore";
import {
  FIRESTORE_COLLECTIONS,
  POKEAPI_BASE_URL,
  MAX_POKEMON_INDEX
} from "../constants";
import firebase from "firebase/app";
import lodash from "lodash";
import { Drag, Drop } from "vue-easy-dnd";

@Component({
  components: {
    Drag,
    Drop
  }
})
export default class Gameboard extends Vue {
  @Prop() private data!: any[][];
  @Prop() private targetX!: number;
  @Prop() private targetY!: number;

  private dndData!: any;

  onClick(cell: any) {
    this.dndData = cell;
  }
}
</script>

<style scoped lang="less">
.cell {
  width: 2rem;
  height: 2rem;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
}

.cell:last-child {
    border-right: 1px solid gray;
}

.row:last-child > .cell {
    border-bottom: 1px solid gray;
}

.cell:hover {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.pokemon-sprite {
  height: 1rem;
  width: 1rem;
}
</style>
