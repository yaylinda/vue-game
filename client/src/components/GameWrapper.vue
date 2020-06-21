<template>
  <v-container class="game-wrapper">
    <div class="grid">
      <div class="row" v-for="(row, rowIndex) in data" :key="rowIndex">
        <Drop
          @drop="onDrop(rowIndex, colIndex)"
          class="cell"
          v-for="(cell, colIndex) in row"
          :key="colIndex"
        >
          <div class="cell-content">
            <Drag class="cell-drag" :data="cell" @mousedown="onClick(cell)">
              <img class="pokemon-sprite" v-if="cell.url" :src="cell.url" />
            </Drag>
            <div>{{cell.row}}, {{cell.col}}</div>
          </div>
        </Drop>
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
export default class GameWrapper extends Vue {
  @Prop() private sessionCookie!: string;

  private data!: any[][];
  private dndData!: any;

  constructor() {
    super();

    this.data = [];

    const numRows = 2;
    const numCols = 2;

    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push({
          row: i,
          col: j,
          url: ""
        });
      }
      this.data.push(row);
    }

    this.data[1][1].url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png";
  }

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
  background-color: #81f5ff;
}

.cell:not(:last-child) {
  margin-right: 1rem;
}

.pokemon-sprite {
  height: 2rem;
  width: 2rem;
}
</style>
