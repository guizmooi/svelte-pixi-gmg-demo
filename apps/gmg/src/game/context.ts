import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { getContextApp } from 'pixi-svelte';

import { eventEmitter, type EmitterEvent } from './eventEmitter';
import { stateLayout, stateLayoutDerived } from './stateLayout';

export const setContext = () => {
	setContextEventEmitter<EmitterEvent>({ eventEmitter });
	setContextLayout({ stateLayout, stateLayoutDerived });
};

export const getContext = () => ({
	...getContextEventEmitter<EmitterEvent>(),
	...getContextLayout(),
	...getContextApp(),
});
