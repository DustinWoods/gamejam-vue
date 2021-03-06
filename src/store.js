import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	passageHistory: [],
	currentPassage: 'intro',
	currentPassageSequence: 0,
	actionsCount: 0,
	currentTime: (new Date('01/01/2018 06:00')).getTime(),
	alarmOn: true,
	transitioning: false,
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
		state.passageHistory = [state.currentPassage, ...state.passageHistory];
		state.currentPassage = newPassage;
	},
	resetGameState (state) {
		state.passageHistory = [];
		state.actionsCount = 0;
	},
	incrementActionsCount(state) {
		state.actionsCount += 1;
	},
	setTransitioningState(state, isTransitioning) {
		state.transitioning = isTransitioning;
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