<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    //- All passages are managed through main.pug
    include ./passages/main.pug
    .debug-footer(v-if='debug') current passage: {{ currentPassage }}
</template>

<script>
import { mappedMutations, mappedGetters, mappedActions } from './store';

export default {
  name: 'app',
  data: function() {
    return {
      debug: true,
    }
  },
  methods: {
    introEnter() {
      this.resetGameState();
      this.$refs["music-loop"].stop();
      this.$refs["riving-window-open"].stop();
      this.$refs["driving"].stop();
    },
    fadeInBackgrounNoise(duration) {
      if(!this.currentBackgroundNoise) {
        this.currentBackgroundNoise = this.$refs.driving;
      }
      this.currentBackgroundNoise.fadeIn(duration);  
      if(this.$refs["music-loop"].playing) {
        this.$refs["music-loop"].fade(10,1,duration);
      }    
    },
    fadeOutBackgrounNoise(duration) {
      if(!this.currentBackgroundNoise) {
        this.currentBackgroundNoise = this.$refs.driving;
      }
      this.currentBackgroundNoise.fadeOut(duration);
      if(this.$refs["music-loop"].playing) {
        this.$refs["music-loop"].fade(1,0,duration);
      }
    },
    windowSequence() {
      this.$refs.window.play();
      this.$refs.driving.fadeOut(1000);
      this.$refs['driving-window-open'].fadeIn(1000);
      this.currentBackgroundNoise = this.$refs['driving-window-open'];
      setTimeout(() => {
        this.goToPassage('driving/actions/window');
      }, 2000);
    },
    breatheSequence() {
      this.$refs["breath"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/deepbreath');
      }, 3000);
    },
    coffeeSequence() {
      this.$refs["sip"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/coffee');
      }, 2000);
    },
    sitUpSequence() {
      this.$refs["sit-up"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/window');
      }, 2000);
    },
    startRadioLoop() {
      this.$refs["music-loop"].play();
    },
    radioSequence() {
      this.$refs["music-open"].fadeIn();
      setTimeout(() => {
        this.goToPassage('driving/actions/radio');
      }, 7000);
    },
    ...mappedMutations,
    ...mappedActions,
  },
  computed: {
    ...mappedGetters,
  },
};
</script>

<style lang="scss">
@import './scss/styles.scss';
</style>
