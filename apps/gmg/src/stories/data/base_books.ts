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
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }],
					[{ name: 'H3' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
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
		payoutMultiplier: 1.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H2' }, { name: 'H3' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
			},
			{ index: 1, type: 'setTotalWin', amount: 1 },
			{ index: 2, type: 'finalWin', amount: 1 }
		],
		criteria: '1',
		baseGameWins: 1.0,
		freeGameWins: 0.0
	},
	{
		id: 3,
		payoutMultiplier: 0.8,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H2' }, { name: 'H2' }, { name: 'H2' }, { name: 'H1' }, { name: 'H3' }],
					[{ name: 'H2' }, { name: 'H2' }, { name: 'H2' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H2' }, { name: 'H2' }, { name: 'H2' }, { name: 'H1' }, { name: 'H3' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
			},
			{ index: 1, type: 'setTotalWin', amount: 0.8 },
			{ index: 2, type: 'finalWin', amount: 0.8 }
		],
		criteria: '2',
		baseGameWins: 0.8,
		freeGameWins: 0.0
	},
	{
		id: 4,
		payoutMultiplier: 0.6,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H3' }, { name: 'H3' }, { name: 'H3' }, { name: 'H1' }, { name: 'H2' }],
					[{ name: 'H3' }, { name: 'H3' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H3' }, { name: 'H3' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
			},
			{ index: 1, type: 'setTotalWin', amount: 0.6 },
			{ index: 2, type: 'finalWin', amount: 0.6 }
		],
		criteria: '3',
		baseGameWins: 0.6,
		freeGameWins: 0.0
	},
	{
		id: 5,
		payoutMultiplier: 0.4,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H4' }, { name: 'H4' }, { name: 'H4' }, { name: 'H1' }, { name: 'H2' }],
					[{ name: 'H4' }, { name: 'H4' }, { name: 'H4' }, { name: 'H3' }, { name: 'H5' }],
					[{ name: 'H4' }, { name: 'H4' }, { name: 'H4' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
			},
			{ index: 1, type: 'setTotalWin', amount: 0.4 },
			{ index: 2, type: 'finalWin', amount: 0.4 }
		],
		criteria: '4',
		baseGameWins: 0.4,
		freeGameWins: 0.0
	},
	{
		id: 6,
		payoutMultiplier: 0.2,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H5' }, { name: 'H5' }, { name: 'H5' }, { name: 'H1' }, { name: 'H2' }],
					[{ name: 'H5' }, { name: 'H5' }, { name: 'H5' }, { name: 'H3' }, { name: 'H4' }],
					[{ name: 'H5' }, { name: 'H5' }, { name: 'H5' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [],
				anticipation: [],
				gameType: 'basegame'
			},
			{ index: 1, type: 'setTotalWin', amount: 0.2 },
			{ index: 2, type: 'finalWin', amount: 0.2 }
		],
		criteria: '5',
		baseGameWins: 0.2,
		freeGameWins: 0.0
	}
];

export default base_books;