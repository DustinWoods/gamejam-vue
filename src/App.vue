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
@import './scss/styles.scss';
</style>
