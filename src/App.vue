<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    //- All passages are managed through main.pug
    include ./passages/main.pug
    .debug-footer(v-if='debug') current passage: {{ currentPassage }}
</template>

<script>
import { mappedMutations, mappedGetters, mappedActions } from './store';
import { isPassageSatisfied } from './libs/utils';

export default {
  name: 'app',
  data: function() {
    return {
      debug: false,
      showBackground: true,
    }
  },
  methods: {
    introEnter() {
      this.resetGameState();
      this.$refs["music-loop"].stop();
      this.$refs["driving-window-open"].stop();
      this.$refs["driving"].stop();
      this.showBackground = true;
    },
    fadeInBackgrounNoise(duration) {
      this.showBackground = true;
      if(!this.currentBackgroundNoise) {
        this.currentBackgroundNoise = this.$refs.driving;
      }
      this.currentBackgroundNoise.fadeIn(duration);  
      if(this.$refs["music-loop"].playing) {
        this.$refs["music-loop"].fade(10,1,duration);
      }    
    },
    fadeOutBackgrounNoise(duration) {
      this.showBackground = false;
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
      }, 5000);
    },
    breatheSequence() {
      this.$refs["breath"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/deepbreath');
      }, 5000);
    },
    coffeeSequence() {
      this.$refs["sip"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/coffee');
      }, 5000);
    },
    sitUpSequence() {
      this.$refs["sit-up"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/situp');
      }, 5000);
    },
    startRadioLoop() {
      this.$refs["music-loop"].play();
    },
    radioSequence() {
      setTimeout(() => {
        this.$refs["music-open"].fadeIn();
      }, 500);
      setTimeout(() => {
        this.goToPassage('driving/actions/radio');
      }, 7500);
    },
    finalSequence() {
      this.$refs["driving-window-open"].fadeOut();
      setTimeout(this.$refs["music-loop"].fadeOut.bind(this.$refs["music-loop"], 5000), 2000);
      setTimeout(this.goToPassage.bind(this, 'intro'), 10000);
    },
    ...mappedMutations,
    ...mappedActions,
  },
  computed: {
    showDrivingBackground() {
      return isPassageSatisfied('driving', this.currentPassage) && this.showBackground;
    },
    ...mappedGetters,
  },
};
</script>

<style lang="scss">
@import './scss/styles.scss';
</style>
