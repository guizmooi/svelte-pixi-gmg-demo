<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM } from 'pixi-svelte';
	import { stateModal, stateBet } from 'state-shared';
	import { bookEventAmountToNormalisedAmount } from 'utils-shared/amount';

	import { UI, UiGameName } from 'components-ui-pixi-theme';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import { playBet } from '../game/utils';
	import base_books from '../stories/data/base_books';
	import EnableSound from './EnableSound.svelte';
	import Sound from './Sound.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import Background from './Background.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
import Win from './Win.svelte';

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
				// Set wagered amount to current bet for proper win scaling
				stateBet.wageredBetAmount = betCost;
				stateBet.balanceAmount -= betCost;

				// Select a random book from base_books
				const randomBookIndex = Math.floor(Math.random() * base_books.length);
				const selectedBook = base_books[randomBookIndex];

				// Play the entire book sequence using playBet
				await playBet({
					...selectedBook,
					state: selectedBook.events
				});

				// Add winnings to balance (convert from book amount to currency amount)
				const winAmount = bookEventAmountToNormalisedAmount(selectedBook.baseGameWins);
				stateBet.balanceAmount += winAmount;
			}
		},
	});
</script>

<App>
	<EnableSound />
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
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
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
		<Win />
		<!-- <FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro /> -->
		
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
