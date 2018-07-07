import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	currentPassage: 'intro',
	currentPassageSequence: 0,
	currentTime: (new Date('01/01/2018 06:00')).getTime(),
	alarmOn: true,
};

const mutations = {
	goToPassage (state, newPassage) {
		const [, incrementDirection, incrementAmount] = newPassage.match(/^([+-]?)([0-9]+)$/) || ['','',''];
		if(incrementAmount) {
			switch (incrementDirection) {
				case '+':
					state.currentPassageSequence += parseInt(incrementAmount);
					break;
				case '-':
					state.currentPassageSequence += parseInt(incrementAmount);					
					break;
				case '':
				default:
					state.currentPassageSequence = parseInt(incrementAmount);
					break;
			}
			return;
		}
		state.currentPassageSequence = 0;
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
};

const actions = {};

const store = new Vuex.Store({
	state,
	mutations,
	actions,
});

const mappedMutations = Vuex.mapMutations(Object.keys(mutations));
const mappedGetters = Vuex.mapState(Object.keys(state));
const mappedActions = Vuex.mapActions(Object.keys(actions));

export { store, mappedMutations, mappedGetters, mappedActions };