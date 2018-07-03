<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    audio(ref="audioplayer" src="./sound/test.ogg")
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
        startPosition = null,
        loop = false,
        volume = 1,
      } = options;

      this.$refs.audioplayer.volume = volume;
      if(startPosition !== null) {
        this.$refs.audioplayer.currentTime = startPosition;
      }
      this.$refs.audioplayer.loop = loop;
      this.$refs.audioplayer.play();
    },
    fadeAudio(options = {}) {
      const {
        fadeInterval = 500,
        fadeTo = 0,
        pauseOnComplete = true,
      } = options;

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
    
      fadeDelta(Date.now(), fadeTo, fadeInterval, this.$refs.audioplayer);
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
