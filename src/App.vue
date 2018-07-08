<template lang="pug">
  #app.container(v-bind:class='currentPassage')
    //- All passages are managed through main.pug
    include ./passages/main.pug
    .debug-footer current passage: {{ currentPassage }}
</template>

<script>
import { mappedMutations, mappedGetters, mappedActions } from './store';

export default {
  name: 'app',
  methods: {
    ...mappedMutations,
    ...mappedActions,
  },
  computed: {
    ...mappedGetters,
  },
};
</script>

<style lang="scss">

body {
  overflow: hidden;
  background: #000;
}

.passage-box {
  background-color: #fffc;
  padding: 30px;
  width: 33%;
  min-width: 600px;
  margin: auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  user-select: none;
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
