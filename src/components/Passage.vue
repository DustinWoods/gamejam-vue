<template>
  <transition>
    <div v-if="currentPassage == title" class="passageContainer">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Passage',
  props: [
    'title',
  ],
  computed: {
    ...mapState([
      'currentPassage',
    ]),
  }
}
</script>

<style lang="scss">
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
  }
  100% {
    opacity: 1;
  }
}
</style>
