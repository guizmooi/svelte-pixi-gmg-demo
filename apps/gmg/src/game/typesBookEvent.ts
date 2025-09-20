type BookEventReveal = {
	index: number;
	type: 'reveal';
	symbols: string[];
	result: 'win' | 'lose';
	amount?: number;
};

type BookEventSetTotalWin = {
	index: number;
	type: 'setTotalWin';
	amount: number;
};

type BookEventFinalWin = {
	index: number;
	type: 'finalWin';
	amount: number;
};

export type BookEvent = BookEventReveal | BookEventSetTotalWin | BookEventFinalWin;

export type BookEventContext = {
	bookEvents: BookEvent[];
};

export type BookEventOfType<T extends BookEvent['type']> = Extract<BookEvent, { type: T }>;