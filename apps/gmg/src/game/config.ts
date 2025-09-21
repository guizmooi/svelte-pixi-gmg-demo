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
		H1: { paytable: { '3': 1 } },
		H2: { paytable: { '3': 0.8 } },
		H3: { paytable: { '3': 0.6 } },
		H4: { paytable: { '3': 0.4 } },
		H5: { paytable: { '3': 0.2 } },
	},
	paddingReels: {
		basegame: [
			// Reel 1
			[
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
			],
			// Reel 2
			[
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
			],
			// Reel 3
			[
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
				{ name: 'H5' },
				{ name: 'H1' },
				{ name: 'H2' },
				{ name: 'H3' },
				{ name: 'H4' },
			],
		],
	},
};
