export default {
	providerName: 'sample_provider',
	gameName: 'sample_lines',
	gameID: '0_0_lines',
	rtp: 0.97,
	numReels: 3,
	numRows: [3, 3, 3],
	betModes: {
		base: {
			cost: 1.0,
			feature: true,
			buyBonus: false,
			rtp: 0.97,
			max_win: 5000.0,
		},
		bonus: {
			cost: 100.0,
			feature: false,
			buyBonus: true,
			rtp: 0.97,
			max_win: 5000.0,
		},
	},
	paylines: {
		'1': [0, 0, 0], // Top row
		'2': [1, 1, 1], // Middle row
		'3': [2, 2, 2], // Bottom row
		'4': [0, 1, 2], // Diagonal top-left to bottom-right
		'5': [2, 1, 0], // Diagonal bottom-left to top-right
	},
	symbols: {
		L1: { paytable: [{ '3': 1 }] },
		L2: { paytable: [{ '3': 0.8 }] },
		L3: { paytable: [{ '3': 0.6 }] },
		L4: { paytable: [{ '3': 0.4 }] },
		L5: { paytable: [{ '3': 0.2 }] },
	},
	paddingReels: {
		basegame: [
			// Reel 1
			[
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
			],
			// Reel 2
			[
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
			],
			// Reel 3
			[
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
				{ name: 'L5' },
				{ name: 'L1' },
				{ name: 'L2' },
				{ name: 'L3' },
				{ name: 'L4' },
			],
		],
	},
};
