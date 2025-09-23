export default [
	// No-win book
	{
		id: 1,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal' as const,
				board: [
					[{ name: 'H1' as const }, { name: 'H2' as const }, { name: 'H3' as const }],
					[{ name: 'H2' as const }, { name: 'H3' as const }, { name: 'H4' as const }],
					[{ name: 'H3' as const }, { name: 'H4' as const }, { name: 'H5' as const }],
				],
				paddingPositions: [216, 205],
				gameType: 'basegame' as const,
				anticipation: [0, 0, 0],
			},
			{ index: 1, type: 'setTotalWin' as const, amount: 0.0 },
			{ index: 2, type: 'finalWin' as const, amount: 0.0 },
		],
		criteria: 'basegame',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},

	// Top row H1×3 win
	{
		id: 2,
		payoutMultiplier: 1.0,
		events: [
			{
				index: 0,
				type: 'reveal' as const,
				board: [
					[{ name: 'H1' as const }, { name: 'H1' as const }, { name: 'H1' as const }],
					[{ name: 'H2' as const }, { name: 'H3' as const }, { name: 'H4' as const }],
					[{ name: 'H3' as const }, { name: 'H4' as const }, { name: 'H5' as const }],
				],
				paddingPositions: [216, 205],
				gameType: 'basegame' as const,
				anticipation: [0, 0, 0],
			},
			{
				index: 1,
				type: 'winInfo' as const,
				totalWin: 300,
				wins: [
					{
						symbol: 'H1' as const,
						kind: 3,
						win: 300,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 },
						],
						meta: {
							paylineId: '1',
							matchedCount: 3,
							winWithoutMult: 300,
							lineWin: 300,
							paylineType: 'top_row',
						},
					},
				],
			},
			{ index: 2, type: 'setWin' as const, amount: 300, winLevel: 1 },
			{ index: 3, type: 'setTotalWin' as const, amount: 300 },
			{ index: 4, type: 'finalWin' as const, amount: 300 },
		],
		criteria: 'basegame',
		baseGameWins: 300,
		freeGameWins: 0.0,
	},

	// Middle row H2×3 win
	{
		id: 3,
		payoutMultiplier: 1.0,
		events: [
			{
				index: 0,
				type: 'reveal' as const,
				board: [
					[{ name: 'H1' as const }, { name: 'H3' as const }, { name: 'H5' as const }],
					[{ name: 'H2' as const }, { name: 'H2' as const }, { name: 'H2' as const }],
					[{ name: 'H3' as const }, { name: 'H4' as const }, { name: 'H1' as const }],
				],
				paddingPositions: [216, 205],
				gameType: 'basegame' as const,
				anticipation: [0, 0, 0],
			},
			{
				index: 1,
				type: 'winInfo' as const,
				totalWin: 250,
				wins: [
					{
						symbol: 'H2' as const,
						kind: 3,
						win: 250,
						positions: [
							{ reel: 0, row: 1 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 1 },
						],
						meta: {
							paylineId: '2',
							matchedCount: 3,
							winWithoutMult: 250,
							lineWin: 250,
							paylineType: 'middle_row',
						},
					},
				],
			},
			{ index: 2, type: 'setWin' as const, amount: 250, winLevel: 1 },
			{ index: 3, type: 'setTotalWin' as const, amount: 250 },
			{ index: 4, type: 'finalWin' as const, amount: 250 },
		],
		criteria: 'basegame',
		baseGameWins: 250,
		freeGameWins: 0.0,
	},

	// Diagonal TL→BR H3×3 win
	{
		id: 4,
		payoutMultiplier: 0.8,
		events: [
			{
				index: 0,
				type: 'reveal' as const,
				board: [
					[{ name: 'H3' as const }, { name: 'H1' as const }, { name: 'H5' as const }],
					[{ name: 'H2' as const }, { name: 'H3' as const }, { name: 'H4' as const }],
					[{ name: 'H1' as const }, { name: 'H4' as const }, { name: 'H3' as const }],
				],
				paddingPositions: [216, 205],
				gameType: 'basegame' as const,
				anticipation: [0, 0, 0],
			},
			{
				index: 1,
				type: 'winInfo' as const,
				totalWin: 200,
				wins: [
					{
						symbol: 'H3' as const,
						kind: 3,
						win: 200,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 2 },
						],
						meta: {
							paylineId: '4',
							matchedCount: 3,
							winWithoutMult: 200,
							lineWin: 200,
							paylineType: 'diagonal_tl_br',
						},
					},
				],
			},
			{ index: 2, type: 'setWin' as const, amount: 200, winLevel: 1 },
			{ index: 3, type: 'setTotalWin' as const, amount: 200 },
			{ index: 4, type: 'finalWin' as const, amount: 200 },
		],
		criteria: 'basegame',
		baseGameWins: 200,
		freeGameWins: 0.0,
	},

	// Multiple wins
	{
		id: 5,
		payoutMultiplier: 2.0,
		events: [
			{
				index: 0,
				type: 'reveal' as const,
				board: [
					[{ name: 'H1' as const }, { name: 'H1' as const }, { name: 'H1' as const }],
					[{ name: 'H1' as const }, { name: 'H2' as const }, { name: 'H4' as const }],
					[{ name: 'H1' as const }, { name: 'H3' as const }, { name: 'H1' as const }],
				],
				paddingPositions: [216, 205],
				gameType: 'basegame' as const,
				anticipation: [0, 0, 0],
			},
			{
				index: 1,
				type: 'winInfo' as const,
				totalWin: 900,
				wins: [
					{
						symbol: 'H1' as const,
						kind: 3,
						win: 300,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 },
						],
						meta: {
							paylineId: '1',
							matchedCount: 3,
							winWithoutMult: 300,
							lineWin: 300,
							paylineType: 'top_row',
						},
					},
					{
						symbol: 'H1' as const,
						kind: 3,
						win: 300,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 2 },
						],
						meta: {
							paylineId: '4',
							matchedCount: 3,
							winWithoutMult: 300,
							lineWin: 300,
							paylineType: 'diagonal_tl_br',
						},
					},
					{
						symbol: 'H1' as const,
						kind: 3,
						win: 300,
						positions: [
							{ reel: 0, row: 2 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 0 },
						],
						meta: {
							paylineId: '5',
							matchedCount: 3,
							winWithoutMult: 300,
							lineWin: 300,
							paylineType: 'diagonal_bl_tr',
						},
					},
				],
			},
			{ index: 2, type: 'setWin' as const, amount: 900, winLevel: 3 },
			{ index: 3, type: 'setTotalWin' as const, amount: 900 },
			{ index: 4, type: 'finalWin' as const, amount: 900 },
		],
		criteria: 'basegame',
		baseGameWins: 900,
		freeGameWins: 0.0,
	},
];