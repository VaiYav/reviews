<template lang="pug">
  div.progressbar
    slot
    div(:class="barClass", :style="barStyle").progressbar-bar
</template>

<script>
  export default {
    name: 'ProgressBar',
    props: {
      value: {
        type: Number,
        default: 0
      },
      origin: {
        type: String,
        default: 'left'
      },
      scale: {
        type: String,
        default: 'X',
        validator: v => ['X', 'Y'].includes(v)
      }
    },
    data () {
      return {
        ready: false
      }
    },
    computed: {
      barStyle () {
        if (!this.ready) {
          return {
            transform: `scale${this.scale}(0)`
          }
        }
        return {
          transform: `scale${this.scale}(${this.value * 0.01})`,
          transformOrigin: `${this.origin}`
        }
      },
      barClass () {
        if (this.value === 100) {
          return 'progressSuccess'
        } else {
          return 'progressDefault'
        }
      }
    },
    mounted () {
      setTimeout(() => { this.ready = true }, 0)
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables";
  .progressbar-bar {
    height: 100%;
    background: #3e4041;
    transition: transform 2s ease, -webkit-transform 2s ease;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    border-radius: 3px;
  }
  .progressbar{
    position: relative;
    height: 24px;
  }
  .progressDefault {
    background: $progressDefault;
  }
  .progressSuccess {
    background: $progressSuccess;
  }
</style>
