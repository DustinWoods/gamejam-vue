<template>
  <a class='passage-hyperlink' @click='clickLink' v-bind:class='{ current: isCurrentPassage, disabled: disabled }'><slot /></a>
</template>

<script>
import { isPassageSatisfied, isPassageInHistory } from '../../libs/utils';
import { mappedMutations, mappedGetters, mappedActions } from '../../store';

export default {
  name: 'Hyperlink',
  props: [
    'to',
    'notAgain',
  ],
  methods: {
    ...mappedActions,
    ...mappedMutations,
    clickLink() {
      if(disabled) return;
      this.$emit('go', this.to);
      this.goToPassage(this.to);
    },
  },
  computed: {
    ...mappedGetters,
    isCurrentPassage() {
      return isPassageSatisfied(this.to, this.currentPassage);
    },
    disabled() {
      if(!this.to) return true;
      if(!this.notAgain) return false;
      return isPassageInHistory(this.to, this.passageHistory) !== -1;
    },
  }
};
</script>

<style lang="scss" scoped>
  .passage-hyperlink {
    &:not(.current):not(.disabled) {
      cursor: pointer;
      text-decoration: underline;
    }
    &.disabled {
      text-decoration: line-through;
    }
  }
</style>
