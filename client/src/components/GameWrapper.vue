<template>
  <div class="game-wrapper">
    <canvas 
        class="game-canvas"
        ref="game" 
        width="640" 
        height="480"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GameWrapper extends Vue {

    $refs!: {
        game: HTMLCanvasElement,
    };

    @Prop() private socket: any;

    private context: any;

    mounted() {
        console.log('[GameWrapper] - mounted');
        this.context = this.$refs.game.getContext("2d");
    }
}
</script>

<style scoped lang="less">

.game-canvas {
    border: 1px solid black;
}

</style>
