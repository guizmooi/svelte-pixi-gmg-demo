export default {
	reveal: {
		type: 'reveal',
		board: [
			[
				{ name: 'H2' },
				{ name: 'H1' },
				{ name: 'H4' },
				{ name: 'H3' },
				{ name: 'H5' },
			],
			[
				{ name: 'H1' },
				{ name: 'H5' },
				{ name: 'H2' },
				{ name: 'H4' },
				{ name: 'H3' },
			],
			[
				{ name: 'H3' },
				{ name: 'H2' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H4' },
			],
		],
		paddingPositions: [10, 11],
		gameType: 'basegame',
		anticipation: [0, 0, 0],
	},
	setTotalWin: {
		type: 'setTotalWin',
		amount: 1.0,
	},
	finalWin: {
		type: 'finalWin',
		amount: 0,
	},
	freeSpinTrigger: {
		type: 'freeSpinTrigger',
		totalFs: 10,
		positions: [
			{
				reel: 0,
				row: 1,
			},
			{
				reel: 1,
				row: 2,
			},
			{
				reel: 2,
				row: 0,
			},
		],
	},
	updateFreeSpin: {
		type: 'updateFreeSpin',
		amount: 1,
		total: 10,
	},
	winInfo: {
		type: 'winInfo',
		totalWin: 1.0,
		wins: [
			{
				symbol: 'H1',
				kind: 3,
				win: 1.0,
				positions: [
					{
						reel: 0,
						row: 0,
					},
					{
						reel: 1,
						row: 0,
					},
					{
						reel: 2,
						row: 0,
					},
				],
				meta: {
					lineIndex: 1,
					multiplier: 1,
					winWithoutMult: 1.0,
					globalMult: 1,
					lineMultiplier: 1.0,
				},
			},
		],
	},
	setWin: {
		type: 'setWin',
		amount: 1.0,
		winLevel: 1,
	},
	freeSpinEnd: {
		type: 'freeSpinEnd',
		amount: 1.0,
		winLevel: 1,
	},
};
