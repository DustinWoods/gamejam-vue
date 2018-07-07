<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    //- All passages are managed through main.pug
    include ./passages/main.pug
    .debug-footer current passage: {{ currentPassage }}
</template>

<script>
import { mappedMutations, mappedGetters, mappedActions } from './store';
//import audioTools from './libs/audio-tools';

export default {
  name: 'app',
  methods: {
    //...audioTools,
    ...mappedMutations,
    ...mappedActions,
  },
  computed: {
    ...mappedGetters,
  },
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
