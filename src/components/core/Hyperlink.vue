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
      if(this.disabled) return;
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
      if(this.transitioning) return true;
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
      &:after {
        content: '➢';
        margin-left: 4px;
        text-decoration: none;
        color: #0d329e;
        display: inline-block;
        font-size: 31px;
        vertical-align: middle;
      }
      &:hover:after {
        color: #6d8ce7;
      }
    }
    &.disabled {
      text-decoration: line-through;
    }
  }
</style>
