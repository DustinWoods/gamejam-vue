<template>
  <div id="app" v-bind:class="currentPassage" class="container">
    <Passage title="morning-alarm">
      <p>Your alarm wakes you *beeep* *beeep* *beep*</p>

      <p>You consider hitting <Hyperlink to="snooze">snooze</Hyperlink> or maybe  if(s.sleptInMinutes > 40) { _finally_ } [[turning off your alarm->turn off alarm]].</p>
    </Passage>
    <Passage title="snooze">
      <p>You turn off your alarm and look at the time <span class="clock-time am">6<i>:</i>00</span>.</p>

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
import Passage from './components/Passage.vue';
import Hyperlink from './components/Hyperlink.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
    Passage,
    Hyperlink,
  },
  methods: {
    ...mapMutations([
      'goToPassage',
    ])
  },
  computed: {
    ...mapState([
      'currentPassage',
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

.clock-time {
  font-family: mono;
  background: #270003;
  padding: 4px 7px 4px 12px;
  margin: 0 10px 0 5px;
  color: #f00;
  position: relative;
  border-radius: 4px;
  box-shadow: 1px -1px 0 0px #79797b, -1px 1px 0 0px #101010, -1px -1px 0 0px #101010, 1px 1px 0 0px #101010, inset 0 0 0 1px #000, inset 0 0 0 5px #121315;
}

.clock-time.pm:after {
  content: '.';
  line-height: 0;
  position: absolute;
  display: block;
  left: 3px;
  top: 3px;
}

@keyframes blink {
    0%   {color: #f00;}
    49%   {color: #f00;}
    50%   {color: #000;}
    99%   {color: #000;}
}

.clock-time i {
  font-style: normal;
}

.clock-time i {
  font-style: normal;
  animation: 1s linear 0s infinite blink;
}

</style>
