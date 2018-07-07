<template>
  <div>
    <a @click="play">Play it</a> {{ resolvedFile }}
  </div>
</template>

<script>
import { Howl } from 'howler';
export default {
  name: 'Howl',
  props: [
    'file',
    'volume',
    'loop',
    'autoplay',
  ],
  created: function() {
    this.resolvedFile = require('../../assets/sound/' + this.file);
    this.sound = new Howl({
      src: [this.resolvedFile],
    });
  },
  methods: {
    play() {
      this.sound.play();
    },
    fade(options = {}) {
      const {
        //refName,
        fadeInterval = 500,
        fadeTo = 0,
        //pauseOnComplete = true,
      } = options;

      this.sound.fade(1, fadeTo, fadeInterval);
    },
  },
}
</script>

<style scoped>
  * {
    /* display: none; */
  }
</style>

