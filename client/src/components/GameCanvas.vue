<template>
      <canvas ref="game" class="game-canvas" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class GameCanvas extends Vue {

    private context!: CanvasRenderingContext2D;

    mounted() {
        const canvas : HTMLCanvasElement = this.$refs.game as HTMLCanvasElement;
        this.context = canvas.getContext("2d")!;
    }

}
</script>

<style scoped lang="less">
.game-canvas {
    width: 550px;
    height: 550px;
    border: 1px solid black;
    margin: 0 auto;
}
</style>