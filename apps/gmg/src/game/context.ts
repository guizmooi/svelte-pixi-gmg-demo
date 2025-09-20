import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { getContextApp, setContextApp } from 'pixi-svelte';

import { eventEmitter, type EmitterEvent } from './eventEmitter';
import { stateLayout, stateLayoutDerived } from './stateLayout';
import { stateApp } from './stateApp';
import { stateGame } from './stateGame.svelte';

export const setContext = () => {
	setContextEventEmitter<EmitterEvent>({ eventEmitter });
	setContextLayout({ stateLayout, stateLayoutDerived });
	setContextApp({ stateApp });
};

export const getContext = () => ({
	...getContextEventEmitter<EmitterEvent>(),
	...getContextLayout(),
	...getContextApp(),
	stateGame,
});
