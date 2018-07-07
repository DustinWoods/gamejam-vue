<template lang='pug'>
  div#container(v-bind:style='{ backgroundColor: color }')
    div#image.full(v-if='type == "image"' v-bind:style='{ backgroundImage: backgroundImage }')
    video#video.full(v-if='type == "video"' autoplay muted loop)
      source(v-bind:src='backgroundVideo' type='video/mp4')
</template>

<script>
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
  }
  .full {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -99;
    left: 0;
    top: 0;
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
</style>
