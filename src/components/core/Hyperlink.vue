<template>
  <a class='passage-hyperlink' @click='clickLink' v-bind:class='{ current: isCurrentPassage }'><slot /></a>
</template>

<script>
import { isPassageSatisfied } from '../../libs/utils';
import { mappedMutations, mappedGetters, mappedActions } from '../../store';

export default {
  name: 'Hyperlink',
  props: [
    'to',
  ],
  methods: {
    ...mappedActions,
    ...mappedMutations,
    clickLink() {
      this.$emit('go', this.to);
      this.goToPassage(this.to);
    },
  },
  computed: {
    ...mappedGetters,
    isCurrentPassage() {
      return isPassageSatisfied(this.to, this.currentPassage);
    },
  }
};
</script>

<style lang="scss" scoped>
  .passage-hyperlink:not(.current) {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
