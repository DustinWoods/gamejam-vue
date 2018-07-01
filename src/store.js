import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
    currentPassage: 'morning-alarm',
    currentTime: (new Date('01-01-2018 06:00')).getTime(),
	},
	mutations: {
		goToPassage (state, newPassage) {
      state.currentPassage = newPassage;
    }
	},
	actions: {
		//
	}
});