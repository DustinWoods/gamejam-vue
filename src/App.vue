<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    //- All passages are managed through main.pug
    include ./passages/main.pug
    .debug-footer current passage: {{ currentPassage }}
</template>

<script>
import Passage from './core-components/Passage.vue';
import Hyperlink from './core-components/Hyperlink.vue';
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
    playAudio(options = {}) {
      const {
        refName,
        startPosition = null,
        loop = false,
        volume = 1,
      } = options;
      const $ref = this.$refs[refName];
      $ref.volume = volume;
      if(startPosition !== null) {
        $ref.currentTime = startPosition;
      }
      $ref.loop = loop;
      setTimeout($ref.play.bind($ref), 100);
    },
    fadeAudio(options = {}) {
      const {
        refName,
        fadeInterval = 500,
        fadeTo = 0,
        pauseOnComplete = true,
      } = options;
      const $ref = this.$refs[refName];
      const fadeDelta = (lastTimeMs, fadeTo, fadeInterval, $audio) => {
        const nowMs = Date.now();
        const deltaTimeMs = nowMs - lastTimeMs;
        $audio.volume -= Math.min(deltaTimeMs / fadeInterval, $audio.volume - fadeTo);
        if($audio.volume > fadeTo) {
          setTimeout(fadeDelta.bind(null, nowMs, fadeTo, fadeInterval, $audio), 100);
        } else if(pauseOnComplete) {
          $audio.pause();
        }
      }
    
      fadeDelta(Date.now(), fadeTo, fadeInterval, $ref);
    },
    ...mapMutations([
      'goToPassage',
      'incrementTime',
      'changeAlarm',
      'restartTimeofDay',
    ])
  },
  computed: {
    ...mapState([
      'currentPassage',
      'currentTime',
      'alarmOn',
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
