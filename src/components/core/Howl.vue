<template>
  <div v-if="debug">
    <button @click="play">Play</button><br>
    <button @click="pause">Pause</button><br>
    <button @click="stop">Stop</button><br>
    <button @click="fade(1, 0, 500)">Fade</button><br>
    Mute: <input type="checkbox" v-model="mute" /><br>
    Loop: <input type="checkbox" v-model="loop" /><br>
    Stereo: <input type="range" min="-1" max="1" step="0.1" v-model="stereo"><br>
    Volume: <input type="range" min="0" max="1" step="0.01" v-model="volume"><br>
    Rate: <input type="range" min="0.5" max="4" step="0.01" v-model="rate"><br>
    File: <a :href="resolvedFile">{{ resolvedFile }}</a><br>
  </div>
</template>

<script>
import { Howl } from 'howler';

// These are passed along to Vue event system
const howlEvents = [
  'load',
  'loaderror',
  'playerror',
  'play',
  'end',
  'pause',
  'stop',
  'mute',
  'volume',
  'rate',
  'seek',
  'fade',
];

export default {
  name: 'Howl',
  props: {
    single: {
      type: Boolean,
      default: true,
    },
    file: {
      type: String,
      default: '',
    },
    volume: {
      type: Number,
      default: 1.0,
    },
    stereo: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 1.0,
      validator: (value) => {
        return value >= 0.5 && value <= 4;
      }
    },
    seek: {
      type: Number,
      default: 0,
    },
    mute: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    play() {
      if(this.single && this.sound.playing()) return;
      if(this.single && this.soundId) {
        this.sound.play(this.soundId);
        return;
      }
      this.soundId = this.sound.play();
    },
    pause() {
      this.sound.pause();
    },
    stop() {
      this.sound.stop();
    },
    fade(from, to, duration = 500) {
      this.sound.fade(from, to, duration);
    },
    fadeOut(duration = 500, resetPosition = false) {
      this.sound.fade(this.sound.volume(), 0, duration);
      if(resetPosition) {
        this.sound.once('fade', this.stop);
      } else {
        this.sound.once('fade', this.pause);
      }
    },
    fadeIn(duration = 500, to = 1) {
      this.play();
      this.sound.fade(0, to, duration);
    },
    state() {
      return this.sound.state();
    },
    playing() {
      return this.sound.playing();
    },
    duration() {
      return this.sound.duration();
    },
  },
  created: function() {
    this.createHowl = function(file) {
      this.sound = new Howl({
        src: [file],
        volume: this.volume,
        loop: this.loop,
        autoplay: this.autoplay,
        stereo: this.stereo,
        mute: this.mute,
        seek: this.seek,
        rate: this.rate,
      });
      howlEvents.forEach((eventName) => {
        this.sound.on(eventName, this.$emit.bind(this, eventName, this.sound));
      });
    };
    this.soundId = null;
    this.createHowl(this.resolvedFile); 
  },
  computed: {
    resolvedFile: function() {
      return require('../../assets/sound/' + this.file);
    }
  },
  watch: {
    stereo: function(newStereo) {
      this.sound.stereo(newStereo);
    },
    volume: function(newVolume) {
      this.sound.volume(newVolume);
    },
    rate: function(newRate) {
      this.sound.rate(newRate);
    },
    seek: function(newSeek) {
      this.sound.seek(newSeek);
    },
    mute: function(newMute) {
      this.sound.mute(newMute);
    },
    resolvedFile: function(newFile) {
      this.createHowl(newFile);
    },
    loop: function(isLoop) {
      this.sound.loop(isLoop);
    },
  }
}
</script>

