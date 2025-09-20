import { setContextEventEmitter, getContextEventEmitter } from 'utils-event-emitter';
import { setContextXstate, getContextXstate } from 'utils-xstate';
import { setContextLayout, getContextLayout } from 'utils-layout';
import { setContextApp, getContextApp } from 'pixi-svelte';
import { eventEmitter } from './eventEmitter';
import { stateXstate, stateXstateDerived } from './stateXstate';
import { stateLayout, stateLayoutDerived } from './stateLayout';
import { stateApp } from './stateApp';

export const setContext = () => {
	setContextEventEmitter({ eventEmitter });
	setContextXstate({ stateXstate, stateXstateDerived });
	setContextLayout({ stateLayout, stateLayoutDerived });
	setContextApp({ stateApp });
};

export const getContext = () => {
	const contextEventEmitter = getContextEventEmitter();
	const contextXstate = getContextXstate();
	const contextLayout = getContextLayout();
	const contextApp = getContextApp();

	return {
		...contextEventEmitter,
		...contextXstate,
		...contextLayout,
		...contextApp,
	};
};