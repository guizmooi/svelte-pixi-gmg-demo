import type { BookEvent } from '../../game/typesBookEvent';

export default {
	reveal: {
		index: 0,
		type: 'reveal',
		symbols: ['🍒', '🍒', '🍒'],
		result: 'win',
		amount: 10
	} as BookEvent,

	setTotalWin: {
		index: 1,
		type: 'setTotalWin',
		amount: 10
	} as BookEvent,

	finalWin: {
		index: 2,
		type: 'finalWin',
		amount: 10
	} as BookEvent
};