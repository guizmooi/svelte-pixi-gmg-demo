export default [
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
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
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
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H1' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }, { name: 'H2' }],
					[{ name: 'H1' }, { name: 'H4' }, { name: 'H5' }, { name: 'H2' }, { name: 'H3' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 1.0,
				wins: [
					{
						symbol: 'H1',
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 1,
							multiplier: 1,
							winWithoutMult: 1.0,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 1.0 },
			{ index: 3, type: 'finalWin', amount: 1.0 }
		],
		criteria: 'basegame',
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
					[{ name: 'H2' }, { name: 'H1' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }],
					[{ name: 'H2' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }, { name: 'H3' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 0.8,
				wins: [
					{
						symbol: 'H2',
						kind: 3,
						win: 0.8,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 1,
							multiplier: 1,
							winWithoutMult: 0.8,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 0.8 },
			{ index: 3, type: 'finalWin', amount: 0.8 }
		],
		criteria: 'basegame',
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
					[{ name: 'H3' }, { name: 'H1' }, { name: 'H2' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H2' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }],
					[{ name: 'H3' }, { name: 'H4' }, { name: 'H5' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 0.6,
				wins: [
					{
						symbol: 'H3',
						kind: 3,
						win: 0.6,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 1,
							multiplier: 1,
							winWithoutMult: 0.6,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 0.6 },
			{ index: 3, type: 'finalWin', amount: 0.6 }
		],
		criteria: 'basegame',
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
					[{ name: 'H4' }, { name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H5' }],
					[{ name: 'H4' }, { name: 'H2' }, { name: 'H3' }, { name: 'H5' }, { name: 'H1' }],
					[{ name: 'H4' }, { name: 'H3' }, { name: 'H5' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 0.4,
				wins: [
					{
						symbol: 'H4',
						kind: 3,
						win: 0.4,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 1,
							multiplier: 1,
							winWithoutMult: 0.4,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 0.4 },
			{ index: 3, type: 'finalWin', amount: 0.4 }
		],
		criteria: 'basegame',
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
					[{ name: 'H5' }, { name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H4' }],
					[{ name: 'H5' }, { name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H1' }],
					[{ name: 'H5' }, { name: 'H3' }, { name: 'H4' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 0.2,
				wins: [
					{
						symbol: 'H5',
						kind: 3,
						win: 0.2,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 1,
							multiplier: 1,
							winWithoutMult: 0.2,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 0.2 },
			{ index: 3, type: 'finalWin', amount: 0.2 }
		],
		criteria: 'basegame',
		baseGameWins: 0.2,
		freeGameWins: 0.0
	},
	{
		id: 7,
		payoutMultiplier: 1.6,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H2' }, { name: 'H1' }, { name: 'H4' }, { name: 'H5' }, { name: 'H3' }],
					[{ name: 'H3' }, { name: 'H4' }, { name: 'H1' }, { name: 'H2' }, { name: 'H5' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 1.6,
				wins: [
					{
						symbol: 'H1',
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 2 }
						],
						meta: {
							lineIndex: 4,
							multiplier: 1,
							winWithoutMult: 1.0,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					},
					{
						symbol: 'H3',
						kind: 3,
						win: 0.6,
						positions: [
							{ reel: 0, row: 2 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 0 }
						],
						meta: {
							lineIndex: 5,
							multiplier: 1,
							winWithoutMult: 0.6,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 1.6 },
			{ index: 3, type: 'finalWin', amount: 1.6 }
		],
		criteria: 'basegame',
		baseGameWins: 1.6,
		freeGameWins: 0.0
	},
	{
		id: 8,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H3' }, { name: 'H5' }, { name: 'H2' }, { name: 'H4' }],
					[{ name: 'H2' }, { name: 'H4' }, { name: 'H1' }, { name: 'H3' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H5' }, { name: 'H2' }, { name: 'H4' }, { name: 'H1' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 }
		],
		criteria: '0',
		baseGameWins: 0.0,
		freeGameWins: 0.0
	},
	{
		id: 9,
		payoutMultiplier: 0.8,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H3' }, { name: 'H5' }, { name: 'H4' }, { name: 'H2' }],
					[{ name: 'H2' }, { name: 'H2' }, { name: 'H1' }, { name: 'H3' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H2' }, { name: 'H4' }, { name: 'H1' }, { name: 'H5' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 0.8,
				wins: [
					{
						symbol: 'H2',
						kind: 3,
						win: 0.8,
						positions: [
							{ reel: 0, row: 1 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 1 }
						],
						meta: {
							lineIndex: 2,
							multiplier: 1,
							winWithoutMult: 0.8,
							globalMult: 1,
							lineMultiplier: 1.0
						}
					}
				]
			},
			{ index: 2, type: 'setTotalWin', amount: 0.8 },
			{ index: 3, type: 'finalWin', amount: 0.8 }
		],
		criteria: 'basegame',
		baseGameWins: 0.8,
		freeGameWins: 0.0
	},
	{
		id: 10,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H2' }, { name: 'H4' }, { name: 'H1' }, { name: 'H3' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H1' }, { name: 'H5' }, { name: 'H2' }, { name: 'H4' }],
					[{ name: 'H4' }, { name: 'H5' }, { name: 'H3' }, { name: 'H1' }, { name: 'H2' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 }
		],
		criteria: '0',
		baseGameWins: 0.0,
		freeGameWins: 0.0
	}
];