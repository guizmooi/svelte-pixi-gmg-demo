<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM } from 'pixi-svelte';
	import { stateModal, stateBet } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import { playBet, playBookEvent } from '../game/utils';
	import events from '../stories/data/base_events';
	import LoadingScreen from './LoadingScreen.svelte';
	import Background from './Background.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';

	const context = getContext();

	onMount(() => (context.stateLayout.showLoadingScreen = true));

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
		bet: async () => {
			// Deduct bet cost from balance
			const betCost = stateBet.betAmount;
			if (betCost <= stateBet.balanceAmount) {
				stateBet.balanceAmount -= betCost;

				// Create a sequence of events similar to base_books structure
				const eventSequence = [
					{ ...events.reveal, index: 0 },
					{ ...events.winInfo, index: 1 },
					{ ...events.setTotalWin, index: 2 },
					{ ...events.finalWin, index: 3 }
				] as any[];

				// Play all events in sequence
				for (const event of eventSequence) {
					await playBookEvent(event, { bookEvents: eventSequence });
				}
			}
		},
	});
</script>

<App>
	<EnableHotkey />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => {
			context.stateLayout.showLoadingScreen = false;
			// Set initial state to idle so BET button is displayed
			context.stateXstate.value = 'idle';
		}} />
	{:else}
		
		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<Board />
			<!-- <Anticipations /> -->
		</MainContainer>

		<UI>
			{#snippet gameName()}
				<UiGameName name="GMG GAME" />
			{/snippet}
			{#snippet logo()}
				<Text
					anchor={{ x: 1, y: 0 }}
					text="ADD YOUR LOGO"
					style={{
						fontFamily: 'proxima-nova',
						fontSize: REM * 1.5,
						fontWeight: '600',
						lineHeight: REM * 2,
						fill: 0xffffff,
					}}
				/>
			{/snippet}

		</UI>
		
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
