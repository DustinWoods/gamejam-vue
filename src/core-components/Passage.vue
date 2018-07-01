<template>
  <transition v-on:enter="handleEnter">
    <div v-if="isCurrentPassage" class="passageContainer">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Passage',
  props: [
    'title',
  ],
  methods: {
    handleEnter() {
      this.$emit('enter');
    }
  },
  computed: {
    isCurrentPassage() {
      return this.$store.state.currentPassage === this.title;
    }
  },
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
    transform: translate(0, 5px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0px);
  }
}
</style>
