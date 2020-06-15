<template>
  <v-app class="app">
    <v-app-bar app dark color="primary">
      <v-toolbar-title>Random Pokemon Battle</v-toolbar-title>
    </v-app-bar>

    <v-content app>
      <router-view />
    </v-content>

    <v-footer app>
      <div>&copy; YayLinda {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {

}
</script>

<style lang="less">
</style>
