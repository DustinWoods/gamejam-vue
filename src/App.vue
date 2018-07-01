<template lang="pug">

  #app.container(v-bind:class='currentPassage')
  
    passage(@enter="consoleLog('alarm going off')" title='morning-alarm')
      p Your alarm wakes you *beeep* *beeep* *beep*
      p
        | You consider hitting 
        hyperlink(@go='incrementTime(10)' to='snooze') snooze
        |  or maybe  if(s.sleptInMinutes &gt; 40) { _finally_ } turning off your alarm.

    passage(title='snooze')
      p
        | You turn off your alarm and look at the time 
        clock(:timestamp='currentTime') .
      p You get out of bed and stand up
      p
        hyperlink(to='deep-sleep') You drift off back to sleep...

    passage(title='deep-sleep')
      p
        hyperlink(to='morning-alarm') You dream about Vue...

  
    .debug-footer current passage: {{ currentPassage }}

</template>

<script>
import Passage from './core-components/Passage.vue';
import Hyperlink from './core-components/Hyperlink.vue';
import Clock from './story-components/Clock.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    Passage,
    Hyperlink,
    Clock,
  },
  methods: {
    consoleLog() {
      //console.log("DID IT" + msg);
    },
    ...mapMutations([
      'goToPassage',
      'incrementTime',
    ])
  },
  computed: {
    ...mapState([
      'currentPassage',
      'currentTime',
    ])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.debug-footer {
  position: fixed;
  bottom: 2px;
  left: 2px;
  font-size: 12px;
  color: #888;
}
</style>
