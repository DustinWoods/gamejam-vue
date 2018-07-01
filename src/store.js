import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentPassage: 'morning-alarm',
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