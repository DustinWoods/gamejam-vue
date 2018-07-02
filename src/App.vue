<template lang="pug">

  #app.container(v-bind:class='currentPassage')
    audio(ref="audioplayer" src="./sound/test.ogg")
    include ./passages/main.pug
  
    .debug-footer current passage: {{ currentPassage }}

</template>

<script>
import Passage from './core-components/Passage.vue';
import Hyperlink from './core-components/Hyperlink.vue';
import TWEEN from '@tweenjs/tween.js';
import Clock from './story-components/Clock.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    Passage,
    Hyperlink,
    Clock,
  },
  methods: {
    consoleLog() {
      //console.log("DID IT" + msg);
    },
    playAudio() {
        var music = this.$refs.audioplayer;
        music.volume = 1;
        if(music.paused){
            music.play();
        }else{
            music.pause();
        }
    },
    fadeAudio() {
      let frameHandler

      // Handles updating the tween on each frame.
      const animate = function (currentTime) {
        TWEEN.update(currentTime)
        frameHandler = requestAnimationFrame(animate)
      }
            
      new TWEEN.Tween({v: 1}).to({v: 0}, 400)
        .onUpdate(({v}) => {
          this.$refs.audioplayer.volume = v;
        })
        .onComplete(() => {
          this.stopAudio();
          cancelAnimationFrame(frameHandler);
        })
        .start();

      frameHandler = requestAnimationFrame(animate);
    },
    stopAudio() {
        var music = this.$refs.audioplayer;
        music.pause();
        music.currentTime = 0;
    },
    ...mapMutations([
      'goToPassage',
      'incrementTime',
    ])
  },
  computed: {
    ...mapState([
      'currentPassage',
      'currentTime',
    ])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.debug-footer {
  position: fixed;
  bottom: 2px;
  left: 2px;
  font-size: 12px;
  color: #888;
}
</style>
