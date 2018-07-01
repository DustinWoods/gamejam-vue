<template>
  <a class="passage-hyperlink" @click="clickLink"><slot /></a>
</template>

<script>
export default {
  name: 'Hyperlink',
  props: [
    'to'
  ],
  methods: {
    clickLink() {
      this.$emit('go', this.to);
      this.$store.commit('goToPassage',this.to);
    }
  },
};
</script>

<style lang="scss">
  .passage-hyperlink {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
