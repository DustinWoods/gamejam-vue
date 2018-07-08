<template lang='pug'>
  transition(v-on:enter='handleEnter' v-on:leave='handleLeave')
    div(v-if='isCurrentPassage' class='passageContainer')
      slot
</template>

<script>
import { mappedGetters } from '../../store';
import { isPassageSatisfied } from '../../libs/utils';

export default {
  name: 'Passage',
  props: {
    title: {
      default: '',
      type: String,
    },
    sequence: {
      default: 0,
      type: Number,
    }
  },
  methods: {
    handleEnter() {
      this.$emit('enter');
    },
    handleLeave() {
      this.$emit('leave');
    },
  },
  computed: {
    isCurrentPassage() {
      const titleSatisfy = this.title ? isPassageSatisfied( this.title, this.currentPassage ) : true;
      const sequenceSatisfy = this.currentPassageSequence >= this.sequence;
      return titleSatisfy && sequenceSatisfy;
    },
    ...mappedGetters,
  },
}
</script>

<style lang="scss" scoped>
.passageContainer {
  &.v-enter-active {
    animation: fade-in 400ms;
  }
  &.v-leave {
    display: none;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translate(0, 5px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0px);
  }
}
</style>
