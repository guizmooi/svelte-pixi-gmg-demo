export default {
	reveal: {
		type: 'reveal' as const,
		board: [
			[{ name: 'H1' as const }, { name: 'H2' as const }, { name: 'H3' as const }],
			[{ name: 'H2' as const }, { name: 'H3' as const }, { name: 'H4' as const }],
			[{ name: 'H3' as const }, { name: 'H4' as const }, { name: 'H5' as const }],
		],
		paddingPositions: [216, 205],
		gameType: 'basegame',
		anticipation: [0, 0, 0],
	},
	winInfo: {
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
	setWin: {
		type: 'setWin' as const,
		amount: 300,
		winLevel: 1,
	},
	setTotalWin: {
		type: 'setTotalWin' as const,
		amount: 300,
	},
	finalWin: {
		type: 'finalWin' as const,
		amount: 300,
	},
} as const;