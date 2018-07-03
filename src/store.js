import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
    currentPassage: 'morning-alarm',
		currentTime: (new Date('01/01/2018 06:00')).getTime(),
		alarmOn: true,
	},
	mutations: {
		goToPassage (state, newPassage) {
      state.currentPassage = newPassage;
    },
		incrementTime (state, minutes) {
      state.currentTime += minutes * 1000 * 60;
    },
		restartTimeofDay (state) {
      state.currentTime = (new Date('01/01/2018 06:00')).getTime();
    },
		changeAlarm (state, newState) {
      state.alarmOn = newState;
    }
	},
	actions: {
		//
	}
});