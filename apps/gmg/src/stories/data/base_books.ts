export default [
	// No-win book - No paylines match
	{
		id: 1,
		payoutMultiplier: 1.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ "name": "H1" }, { "name": "H2" }, { "name": "H3" }],
					[{ "name": "H2" }, { "name": "H3" }, { "name": "H4" }],
					[{ "name": "H3" }, { "name": "H4" }, { "name": "H5" }]
				],
				paddingPositions: [216, 205],
				gameType: "basegame",
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: "winInfo",
				totalWin: 1.0,
				wins: [
					{
						symbol: "H3",
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 2 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 0 }
						],
						meta: {
							paylineId: "diag_bl_tr",
							matchedCount: 3,
							winWithoutMult: 1.0,
							lineWin: 1.0,
							paylineType: "diagonal"
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 1, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 1 },
			{ index: 4, type: 'finalWin', amount: 1 },
		],
		criteria: "basegame",
		baseGameWins: 1.0,
		freeGameWins: 0.0
	},

	// Top row H1×3 win (payline 1) - Your exact example
	{
		id: 2,
		payoutMultiplier: 1.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H1' }, { name: 'H3' }, { name: 'H4' }],
					[{ name: 'H1' }, { name: 'H4' }, { name: 'H5' }]
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
							paylineId: '1',
							matchedCount: 3,
							winWithoutMult: 1.0,
							lineWin: 1.0,
							paylineType: 'top_row'
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 10, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 10 },
			{ index: 4, type: 'finalWin', amount: 10 },
		],
		criteria: 'basegame',
		baseGameWins: 1.0,
		freeGameWins: 0.0
	},

	// Middle row H2×3 win (payline 2)
	{
		id: 3,
		payoutMultiplier: 1,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H4' }, { name: 'H2' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H2' }, { name: 'H1' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 1,
				wins: [
					{
						symbol: 'H2',
						kind: 3,
						win: 1,
						positions: [
							{ reel: 0, row: 1 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 1 }
						],
						meta: {
							paylineId: '2',
							matchedCount: 3,
							winWithoutMult: 1,
							lineWin: 1,
							paylineType: 'middle_row'
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 1, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 1 },
			{ index: 4, type: 'finalWin', amount: 1 },
		],
		criteria: 'basegame',
		baseGameWins: 1,
		freeGameWins: 0.0
	},

	// Bottom row H3×3 win (payline 3)
	{
		id: 4,
		payoutMultiplier: 0.6,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H4' }, { name: 'H5' }, { name: 'H3' }],
					[{ name: 'H3' }, { name: 'H1' }, { name: 'H3' }]
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
							{ reel: 0, row: 2 },
							{ reel: 1, row: 2 },
							{ reel: 2, row: 2 }
						],
						meta: {
							paylineId: '3',
							matchedCount: 3,
							winWithoutMult: 0.6,
							lineWin: 0.6,
							paylineType: 'bottom_row'
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 10, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 10 },
			{ index: 4, type: 'finalWin', amount: 10 },
		],
		criteria: 'basegame',
		baseGameWins: 0.6,
		freeGameWins: 0.0
	},

	// Diagonal TL→BR H4×3 win (payline 4: [0,1,2])
	{
		id: 5,
		payoutMultiplier: 0.4,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H4' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H1' }, { name: 'H4' }, { name: 'H5' }],
					[{ name: 'H3' }, { name: 'H1' }, { name: 'H4' }]
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
							{ reel: 1, row: 1 },
							{ reel: 2, row: 2 }
						],
						meta: {
							paylineId: '4',
							matchedCount: 3,
							winWithoutMult: 0.4,
							lineWin: 0.4,
							paylineType: 'diagonal_tl_br'
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 10, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 10 },
			{ index: 4, type: 'finalWin', amount: 10 },
		],
		criteria: 'basegame',
		baseGameWins: 0.4,
		freeGameWins: 0.0
	},

	// Diagonal BL→TR H5×3 win (payline 5: [2,1,0])
	{
		id: 6,
		payoutMultiplier: 0.2,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H5' }],
					[{ name: 'H4' }, { name: 'H5' }, { name: 'H3' }],
					[{ name: 'H5' }, { name: 'H1' }, { name: 'H4' }]
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
							{ reel: 0, row: 2 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 0 }
						],
						meta: {
							paylineId: '5',
							matchedCount: 3,
							winWithoutMult: 0.2,
							lineWin: 0.2,
							paylineType: 'diagonal_bl_tr'
						}
					}
				]
			},
			
			{ index: 2, type: 'setWin', amount: 10, winLevel: 1 },
			{ index: 3, type: 'setTotalWin', amount: 10 },
			{ index: 4, type: 'finalWin', amount: 10 },
		],
		criteria: 'basegame',
		baseGameWins: 0.2,
		freeGameWins: 0.0
	},

	// Multiple paylines - Top row H1×3 + Middle row H2×3
	{
		id: 7,
		payoutMultiplier: 1.8,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }],
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H4' }],
					[{ name: 'H1' }, { name: 'H2' }, { name: 'H5' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 1.8,
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
							paylineId: '1',
							matchedCount: 3,
							winWithoutMult: 1.0,
							lineWin: 1.0,
							paylineType: 'top_row'
						}
					},
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
							paylineId: '2',
							matchedCount: 3,
							winWithoutMult: 0.8,
							lineWin: 0.8,
							paylineType: 'middle_row'
						}
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 1.8, winLevel: 2 },
			{ index: 3, type: 'setTotalWin', amount: 1.8 },
			{ index: 4, type: 'finalWin', amount: 1.8 },
		],
		criteria: 'basegame',
		baseGameWins: 1.8,
		freeGameWins: 0.0
	},

	{
		id: 8,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: "reveal",
				board: [
					[{ name: "H1" }, { name: "H2" }, { name: "H3" }],
					[{ name: "H4" }, { name: "H5" }, { name: "H1" }],
					[{ name: "H2" }, { name: "H3" }, { name: "H4" }]
				],
				paddingPositions: [216, 205],
				gameType: "basegame",
				anticipation: [0, 0, 0]
			},
			{ index: 1, type: "setTotalWin", amount: 0.0 },
			{ index: 2, type: "finalWin", amount: 0.0 }
		],
		criteria: "basegame",
		baseGameWins: 0.0,
		freeGameWins: 0.0
	},

	 {
    id: 9,
    payoutMultiplier: 0.0,
    events: [
      {
        index: 0,
        type: "reveal",
        board: [
          [{ name: "H1" }, { name: "H2" }, { name: "H3" }],
          [{ name: "H4" }, { name: "H5" }, { name: "H1" }],
          [{ name: "H2" }, { name: "H3" }, { name: "H4" }]
        ],
        paddingPositions: [216, 205],
        gameType: "basegame",
        anticipation: [0, 0, 0]
      },
      { index: 1, type: "setTotalWin", amount: 0.0 },
      { index: 2, type: "finalWin", amount: 0.0 }
    ],
    criteria: "basegame",
    baseGameWins: 0.0,
    freeGameWins: 0.0
  },
  {
    id: 10,
    payoutMultiplier: 0.0,
    events: [
      {
        index: 0,
        type: "reveal",
        board: [
          [{ name: "H2" }, { name: "H3" }, { name: "H4" }],
          [{ name: "H5" }, { name: "H1" }, { name: "H2" }],
          [{ name: "H3" }, { name: "H4" }, { name: "H5" }]
        ],
        paddingPositions: [216, 205],
        gameType: "basegame",
        anticipation: [0, 0, 0]
      },
      { index: 1, type: "setTotalWin", amount: 0.0 },
      { index: 2, type: "finalWin", amount: 0.0 }
    ],
    criteria: "basegame",
    baseGameWins: 0.0,
    freeGameWins: 0.0
  },
  {
    id: 11,
    payoutMultiplier: 0.0,
    events: [
      {
        index: 0,
        type: "reveal",
        board: [
          [{ name: "H3" }, { name: "H4" }, { name: "H5" }],
          [{ name: "H1" }, { name: "H2" }, { name: "H3" }],
          [{ name: "H4" }, { name: "H5" }, { name: "H1" }]
        ],
        paddingPositions: [216, 205],
        gameType: "basegame",
        anticipation: [0, 0, 0]
      },
      { index: 1, type: "setTotalWin", amount: 0.0 },
      { index: 2, type: "finalWin", amount: 0.0 }
    ],
    criteria: "basegame",
    baseGameWins: 0.0,
    freeGameWins: 0.0
  },
  {
    id: 12,
    payoutMultiplier: 0.0,
    events: [
      {
        index: 0,
        type: "reveal",
        board: [
          [{ name: "H4" }, { name: "H5" }, { name: "H1" }],
          [{ name: "H2" }, { name: "H3" }, { name: "H4" }],
          [{ name: "H5" }, { name: "H1" }, { name: "H2" }]
        ],
        paddingPositions: [216, 205],
        gameType: "basegame",
        anticipation: [0, 0, 0]
      },
      { index: 1, type: "setTotalWin", amount: 0.0 },
      { index: 2, type: "finalWin", amount: 0.0 }
    ],
    criteria: "basegame",
    baseGameWins: 0.0,
    freeGameWins: 0.0
  },
  {
    id: 13,
    payoutMultiplier: 0.0,
    events: [
      {
        index: 0,
        type: "reveal",
        board: [
          [{ name: "H5" }, { name: "H1" }, { name: "H2" }],
          [{ name: "H3" }, { name: "H4" }, { name: "H5" }],
          [{ name: "H1" }, { name: "H2" }, { name: "H3" }]
        ],
        paddingPositions: [216, 205],
        gameType: "basegame",
        anticipation: [0, 0, 0]
      },
      { index: 1, type: "setTotalWin", amount: 0.0 },
      { index: 2, type: "finalWin", amount: 0.0 }
    ],
    criteria: "basegame",
    baseGameWins: 0.0,
    freeGameWins: 0.0
  },
	// Multiple paylines - Top row H1×3 + Middle row H2×3
	{
		id: 14,
		payoutMultiplier: 1.8,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'H3' }, { name: 'H1' }, { name: 'H4' }],
					[{ name: 'H1' }, { name: 'H3' }, { name: 'H1' }]
				],
				paddingPositions: [216, 205],
				gameType: 'basegame',
				anticipation: [0, 0, 0]
			},
			{
				index: 1,
				type: 'winInfo',
				totalWin: 3.0,  // sum of all 3 wins
				wins: [
					// Top row H1x3
					{
						symbol: 'H1',
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 0, row: 1 },
							{ reel: 0, row: 2 }
						],
						meta: { paylineId: '1', matchedCount: 3, winWithoutMult: 1.0, lineWin: 1.0, paylineType: 'top_row' }
					},
					// Diagonal TL->BR H1x3
					{
						symbol: 'H1',
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 2 }
						],
						meta: { paylineId: 'diag_tl_br', matchedCount: 3, winWithoutMult: 1.0, lineWin: 1.0, paylineType: 'diagonal_tl_br' }
					},
					// Diagonal BL->TR H1x3
					{
						symbol: 'H1',
						kind: 3,
						win: 1.0,
						positions: [
							{ reel: 0, row: 2 },
							{ reel: 1, row: 1 },
							{ reel: 2, row: 0 }
						],
						meta: { paylineId: 'diag_bl_tr', matchedCount: 3, winWithoutMult: 1.0, lineWin: 1.0, paylineType: 'diagonal_bl_tr' }
					}
				]
			},
			{ index: 2, type: 'setWin', amount: 3.0, winLevel: 2 },
			{ index: 3, type: 'setTotalWin', amount: 3.0 },
			{ index: 4, type: 'finalWin', amount: 3.0 }
		],
		criteria: 'basegame',
		baseGameWins: 3.0,
		freeGameWins: 0.0
	}
];