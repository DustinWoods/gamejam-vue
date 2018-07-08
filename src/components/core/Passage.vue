<template lang='pug'>
  transition(@enter='handleEnter' @after-leave='handleLeave')
    div(v-if='(isCurrentPassage && !fallingAsleep)' class='passageContainer' v-bind:class='{inline, fallingAsleep:(sleepAfter > 0)}')
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
    },
    inline: {
      default: false,
      type: Boolean,
    },
    sleepAfter: {
      default: null,
      type: Number,
    }
  },
  data: function() {
    return {
      fallingAsleep: false,
    }
  },
  methods: {
    startSleep() {
      this.fallingAsleep = true;
    },
    handleEnter() {
      this.$emit('enter');
      if(this.sleepAfter !== null && this.sleepAfter > 0) {
        setTimeout(this.startSleep, this.sleepAfter);
      }
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

@import '../../scss/variables.scss';

.passageContainer {
  .inline {
    display: inline;
  }
  &.v-enter-active:not(.wake-up) {
    animation: fade-in 400ms;
  }
  &.v-enter-active.wake-up {
    animation: shake-in 100ms;
    &.slow {
      animation-name: shake-in-less;
      animation-duration: 600ms;
    }
    &.slowest {
      animation-name: shake-in-less;
      animation-duration: 800ms;
    }
  }
  &.v-leave:not(.fallingAsleep) {
    display: none;
  }
  &.fallingAsleep.v-leave-active {
    animation: fade-to-blur $sleep-transition-time;
    animation-delay: $sleep-transition-delay;
    animation-timing-function: cubic-bezier(1.000, 0.005, 0.470, 0.780);
    animation-fill-mode: forwards;
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

@keyframes shake-in {
  0% {
    opacity: 0;
    transform: translateY(50px);
    transform: translateX(110px);
  }
  10% {
    transform: translateX(-100px);
  }
  20% {
    transform: translateX(90px);
  }
  30% {
    transform: translateX(-80px);
  }
  40% {
    transform: translateX(70px);
  }
  50% {
    transform: translateX(-60px);
  }
  60% {
    transform: translateX(50px);
  }
  70% {
    transform: translateX(-40px);
  }
  80% {
    transform: translateX(30px);
  }
  90% {
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}


@keyframes shake-in-less {
  0% {
    opacity: 0;
    transform: translateY(50px);
    transform: translateX(20px);
  }
  10% {
    transform: translateX(-18px);
  }
  20% {
    transform: translateX(16px);
  }
  30% {
    transform: translateX(-14px);
  }
  40% {
    transform: translateX(12px);
  }
  50% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-6px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-2px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

@keyframes fade-to-blur {
  0% {
    opacity: 1;
    filter: blur(0);
    transform: scaleX(1) scaleY(1);
  }
  75% {
    transform: scaleX(1) scaleY(1);
  }
  80% {
    opacity: 0;
    filter: blur(4px);
    transform: scaleX(1.8) scaleY(1.5);
  }
  100% {
    opacity: 0;
  }
}

</style>
