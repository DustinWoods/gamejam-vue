<template>
  <div id="app" v-bind:class="currentPassage" class="container">


    <Passage @enter="consoleLog('alarm going off')" title="morning-alarm">
      <p>Your alarm wakes you *beeep* *beeep* *beep*</p>

      <p>You consider hitting <Hyperlink @go="incrementTime(10)" to="snooze">snooze</Hyperlink> or maybe  if(s.sleptInMinutes > 40) { _finally_ } [[turning off your alarm->turn off alarm]].</p>
    </Passage>

    <Passage title="snooze">
      <p>You turn off your alarm and look at the time <Clock :timestamp="currentTime" />.</p>

      <p>[[You get out of bed and stand up->stand up]]</p>

      <p><Hyperlink to="deep-sleep">You drift off back to sleep...</Hyperlink></p>
    </Passage>

    <Passage title="deep-sleep">
      <p><Hyperlink to="morning-alarm">You dream about Vue...</Hyperlink></p>
    </Passage>

    
    <div class="debug-footer">current passage: {{ currentPassage }}</div>
  </div>
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
