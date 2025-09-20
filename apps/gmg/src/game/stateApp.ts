import { createApp } from 'pixi-svelte';

export const { stateApp } = createApp({
	assets: {},
	reset: () => {
		// Reset game state if needed
	}
});