import type { BookEvent } from '../../game/typesBookEvent';

type Book = {
	id: number;
	payoutMultiplier: number;
	events: BookEvent[];
	criteria: string;
	baseGameWins: number;
	freeGameWins: number;
};

export const base_books: Book[] = [
	{
		id: 1,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				symbols: ['🍒', '🍋', '🍊'],
				result: 'lose'
			},
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 }
		],
		criteria: '0',
		baseGameWins: 0.0,
		freeGameWins: 0.0
	},
	{
		id: 2,
		payoutMultiplier: 10.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				symbols: ['🍒', '🍒', '🍒'],
				result: 'win',
				amount: 10
			},
			{ index: 1, type: 'setTotalWin', amount: 10 },
			{ index: 2, type: 'finalWin', amount: 10 }
		],
		criteria: '1',
		baseGameWins: 10.0,
		freeGameWins: 0.0
	},
	{
		id: 3,
		payoutMultiplier: 100.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				symbols: ['💎', '💎', '💎'],
				result: 'win',
				amount: 100
			},
			{ index: 1, type: 'setTotalWin', amount: 100 },
			{ index: 2, type: 'finalWin', amount: 100 }
		],
		criteria: '2',
		baseGameWins: 100.0,
		freeGameWins: 0.0
	}
];

export default base_books;