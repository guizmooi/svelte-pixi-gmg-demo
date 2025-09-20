import type { BookEvent, BookEventContext, BookEventOfType } from './typesBookEvent';
import { eventEmitter } from './eventEmitter';

export type BookEventHandlerMap<
	TBookEvent extends BookEvent = BookEvent,
	TBookEventContext extends BookEventContext = BookEventContext
> = {
	[K in TBookEvent['type']]: (
		bookEvent: BookEventOfType<K>,
		context?: TBookEventContext
	) => Promise<void> | void;
};

const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'];

const getRandomSymbols = (): string[] => {
	return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
};

const checkWin = (symbols: string[]): { isWin: boolean; amount: number } => {
	// Simple win logic: all three symbols must match
	const allMatch = symbols.every(symbol => symbol === symbols[0]);
	const winAmounts: Record<string, number> = {
		'🍒': 10,
		'🍋': 20,
		'🍊': 30,
		'🍇': 40,
		'⭐': 50,
		'💎': 100
	};

	return {
		isWin: allMatch,
		amount: allMatch ? winAmounts[symbols[0]] || 0 : 0
	};
};

export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	reveal: async (bookEvent: BookEventOfType<'reveal'>) => {
		// Generate random symbols if not provided
		const gameSymbols = bookEvent.symbols.length > 0 ? bookEvent.symbols : getRandomSymbols();
		const { isWin, amount } = checkWin(gameSymbols);

		// Simulate spinning delay
		eventEmitter.broadcast({ type: 'gameSpin' });

		await new Promise(resolve => setTimeout(resolve, 2000));

		// Reveal the symbols
		eventEmitter.broadcast({
			type: 'gameReveal',
			symbols: gameSymbols,
			result: isWin ? 'win' : 'lose'
		});

		if (isWin) {
			await new Promise(resolve => setTimeout(resolve, 500));
			eventEmitter.broadcast({ type: 'gameWin', amount });
		}

		await new Promise(resolve => setTimeout(resolve, 1000));
		eventEmitter.broadcast({ type: 'gameIdle' });
	},

	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		eventEmitter.broadcast({ type: 'gameWin', amount: bookEvent.amount });
	},

	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		eventEmitter.broadcast({ type: 'gameWin', amount: bookEvent.amount });
	}
};