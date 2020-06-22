<template>
  <v-container class="gameboard">
    <div class="grid">
      <div class="row" v-for="(row, rowIndex) in data" :key="rowIndex">
        <drop
          @drop="onDrop(rowIndex, colIndex)"
          class="cell"
          v-for="(cell, colIndex) in row"
          :key="colIndex"
        >
          <div class="cell-content">
            <drag class="cell-drag" :data="cell" @mousedown="onClick(cell)">
              <img class="pokemon-sprite" v-if="cell.url" :src="cell.url" />
            </drag>
          </div>
        </drop>
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

  private dndData!: any;

  onDrop(row: number, col: number) {
    console.log(`onDrop - row: ${row}, col: ${col}`);
    console.log(`onDrop - this.dndData: ${JSON.stringify(this.dndData)}`);

    this.data[row][col].url = this.dndData.url;
    this.data[this.dndData.row][this.dndData.col].url = "";
    this.dndData = null;
  }

  onClick(cell: any) {
    this.dndData = cell;
  }
}
</script>

<style scoped lang="less">
.row:not(:last-child) {
  margin-bottom: 1rem;
}

.cell {
  width: 5rem;
  height: 5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}

.cell:hover {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.cell:not(:last-child) {
  margin-right: 1rem;
}

.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.pokemon-sprite {
  height: 2rem;
  width: 2rem;
}
</style>
