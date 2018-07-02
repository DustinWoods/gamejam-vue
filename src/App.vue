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
