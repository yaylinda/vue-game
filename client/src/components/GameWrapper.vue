<template>
  <v-container class="game-wrapper">

    

  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { db } from "@/firestore";
import { FIRESTORE_COLLECTIONS } from '../constants';

@Component({

})
export default class GameWrapper extends Vue {

  @Prop() private sessionCookie!: string;
  @Prop() private allPokemon!: any[];

  private currentPokemon!: any;
  private currentPokmeonSwipeData!: any;
  private currentSessionCookieSwipeData!: any;
  private aggregatedSwipeData!: any;

  mounted() {
    this.getRandomPokmeon();
    this.getCurrentSwipeData();
    this.aggregateSwipeData();
  }

  getRandomPokmeon() {
    const randomIndex: number = Math.floor(Math.random() * Math.floor(this.allPokemon.length));
    console.log(`[GameWrapper][getRandomPokmeon] - randomIndex: ${randomIndex}`);

    this.currentPokemon = this.allPokemon[randomIndex];
    console.log(`[GameWrapper][getRandomPokmeon] - this.currentPokemon: ${JSON.stringify(this.currentPokemon)}`);
  }

  getCurrentSwipeData() {
    db.collection(FIRESTORE_COLLECTIONS.POKEMON_SWIPES).doc(this.currentPokemon.id).get().then(snapshot => {
      this.currentPokmeonSwipeData = snapshot.data();
    console.log(`[GameWrapper][getCurrentSwipeData] - this.currentPokmeonSwipeData: ${JSON.stringify(this.currentPokmeonSwipeData)}`);
    });

    db.collection(FIRESTORE_COLLECTIONS.SESSION_COOKIE_SWIPES).doc(this.sessionCookie).get().then(snapshot => {
      this.currentSessionCookieSwipeData = snapshot.data();
          console.log(`[GameWrapper][getCurrentSwipeData] - this.currentSessionCookieSwipeData: ${JSON.stringify(this.currentSessionCookieSwipeData)}`);

    });
  }

  aggregateSwipeData() {
    const aggregated = {};

    this.aggregatedSwipeData = aggregated;
  }

  persistSwipe(selected: boolean) {
    db.collection(FIRESTORE_COLLECTIONS.POKEMON_SWIPES)
  }
}
</script>

<style scoped lang="less">

</style>
