import { createEventEmitter } from 'utils-event-emitter';
import type { EmitterEventUi, EmitterEventHotKey } from 'components-ui-pixi';
import type { EmitterEventGameGmg } from './typesEmitterEvent';

export type EmitterEvent = EmitterEventUi | EmitterEventHotKey | EmitterEventGameGmg;
export const { eventEmitter } = createEventEmitter<EmitterEvent>();