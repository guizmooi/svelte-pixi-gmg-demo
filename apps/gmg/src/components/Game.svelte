<script lang="ts" module>
	export type EmitterEventGame =
		| { type: 'gameReveal'; symbols: string[]; result: 'win' | 'lose' }
		| { type: 'gameWin'; amount: number }
		| { type: 'gameSpin' }
		| { type: 'gameIdle' };
</script>

<script lang="ts">
	import { App, Container, Text } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { REM } from 'constants-shared';
	import GameBoard from './GameBoard.svelte';
	import WinDisplay from './WinDisplay.svelte';

	const context = getContext();

	let isSpinning = $state(false);
	let currentWin = $state(0);
	let symbols = $state(['?', '?', '?']);

	context.eventEmitter.subscribeOnMount({
		gameSpin: () => {
			isSpinning = true;
			symbols = ['?', '?', '?'];
			currentWin = 0;
		},
		gameReveal: (emitterEvent) => {
			symbols = emitterEvent.symbols;
			isSpinning = false;
		},
		gameWin: (emitterEvent) => {
			currentWin = emitterEvent.amount;
		},
		gameIdle: () => {
			isSpinning = false;
		}
	});
</script>

<App
	width={context.stateLayoutDerived.canvasSizes().width}
	height={context.stateLayoutDerived.canvasSizes().height}
	backgroundColor={0x2c3e50}
>
	<Container x={context.stateLayoutDerived.canvasSizes().width / 2} y={50} anchor={{ x: 0.5, y: 0 }}>
		<Text
			text="GMG DEMO GAME"
			style={{
				fontFamily: 'Arial',
				fontSize: REM * 2,
				fontWeight: 'bold',
				fill: 0xffffff
			}}
			anchor={{ x: 0.5, y: 0 }}
		/>
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width / 2} y={150} anchor={{ x: 0.5, y: 0 }}>
		<GameBoard {symbols} {isSpinning} />
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width / 2} y={350} anchor={{ x: 0.5, y: 0 }}>
		<WinDisplay {currentWin} />
	</Container>

	<Container x={context.stateLayoutDerived.canvasSizes().width / 2} y={450} anchor={{ x: 0.5, y: 0 }}>
		<Text
			text={isSpinning ? "SPINNING..." : "CLICK TO SPIN"}
			style={{
				fontFamily: 'Arial',
				fontSize: REM * 1.2,
				fill: isSpinning ? 0xffaa00 : 0x00ff00
			}}
			anchor={{ x: 0.5, y: 0 }}
			interactive={!isSpinning}
			cursor="pointer"
			onclick={() => {
				if (!isSpinning) {
					context.eventEmitter.broadcast({ type: 'gameSpin' });
				}
			}}
		/>
	</Container>
</App>