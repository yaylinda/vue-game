<template>
  <v-container class="home">

    <v-container v-if="showUsernameInput" class="username-input">
      <v-text-field v-model="usernameInput" label="Outlined" placeholder="Placeholder" outlined />
      <v-btn @click="setAndPersistUsername" color="primary">Submit</v-btn>
    </v-container>

    <v-container v-if="showAuthedState">
      <GameWrapper sessionCookie="sessionCookie" allPokemon="allPokemon"/>
    </v-container>

  </v-container>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  FIRESTORE_COLLECTIONS,
  VUE_GAME_SESSION_COOKIE_STR
} from "@/constants";
import { db } from "@/firestore";
import firebase from "firebase/app";
import GameWrapper from "@/components/GameWrapper.vue";


@Component({
  components: {
    GameWrapper
  }
})
export default class Home extends Vue {
  // States
  private showUsernameInput: boolean = false;
  private showAuthedState: boolean = false;

  private allPokemon: any[] = [];
  private sessionCookie!: string;
  private sessionData!: any;

  private usernameInput: string = "";

  mounted() {
    this.sessionCookie = this.$cookies.get(VUE_GAME_SESSION_COOKIE_STR);

    if (this.sessionCookie) {
      this.getSessionDataFromSessionCookie();
    } else {
      this.showUsernameInput = true;
    }

    db.collection(FIRESTORE_COLLECTIONS.POKEMON_REGISTRY).get().then(querySnapshot => {
      this.allPokemon = querySnapshot.docs.map(doc => doc.data());
      console.log(`[App][mounted] - retreived ${this.allPokemon.length} pokemon`);
    });
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
          `[App][mounted] - got sessionData: ${JSON.stringify(
            this.sessionData
          )}`
        );
        if (this.sessionData) {
          this.$toast.success(`Hello ${this.sessionData.username}`);
          this.showAuthedState = true;
        } else {
          this.showUsernameInput = true;
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
}
</script>

<style scoped lang="less">
</style>
