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
    fadeInBackgrounNoise(duration) {
      if(!this.currentBackgroundNoise) {
        this.currentBackgroundNoise = this.$refs.driving;
      }
      this.currentBackgroundNoise.fadeIn(duration);      
    },
    fadeOutBackgrounNoise(duration) {
      if(!this.currentBackgroundNoise) {
        this.currentBackgroundNoise = this.$refs.driving;
      }
      this.currentBackgroundNoise.fadeOut(duration);
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
    sitUpSequence() {
      this.$refs["sit-up"].play();
      setTimeout(() => {
        this.goToPassage('driving/actions/window');
      }, 2000);
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
