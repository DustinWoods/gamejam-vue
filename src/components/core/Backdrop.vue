<template lang='pug'>
  transition
    div#container(v-bind:style='{ backgroundColor: color }' v-if='isCurrentPassage')
      div#image.full(v-if='type == "image"' v-bind:style='{ backgroundImage: backgroundImage }')
      video#video.full(v-if='type == "video"' autoplay muted loop)
        source(v-bind:src='backgroundVideo' type='video/mp4')
</template>

<script>
import { mappedGetters } from '../../store';
import { isPassageSatisfied } from '../../libs/utils';

export default {
  name: 'Backdrop',
  props: {
    file: {
      default: '',
      type: String,  
    },
    type: {
      default: 'image',
      type: String,  
    },
    color: {
      default: '#fff',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    sequence: {
      default: 0,
      type: Number,
    }
  },
  computed: {
    backgroundImage: function() {
      if(this.type !== 'image') return;
      return 'url(' + require('../../assets/backdrops/' + this.file) + ')';
    },
    backgroundVideo: function() {
      if(this.type !== 'video') return;
      return require('../../assets/backdrops/' + this.file);
    },
    isCurrentPassage() {
      const titleSatisfy = this.title ? isPassageSatisfied( this.title, this.currentPassage ) : true;
      const sequenceSatisfy = this.currentPassageSequence >= this.sequence;
      return titleSatisfy && sequenceSatisfy;
    },
    ...mappedGetters,
  }
}
</script>

<style lang="scss" scoped>
  #container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -99;
    &.v-enter-active {
      animation: fade-in 400ms;
    }
    &.v-leave {
      display: none;
    }
  }
  .full {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -99;
    margin: auto;
  }
  #video {
    margin: 0 auto;
    width: 100vw;
  }
  #image {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
    width: 100vw;
    height: 100vh;
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
