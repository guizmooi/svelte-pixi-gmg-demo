<!--
	@component Game

	Main game component that orchestrates all game functionality including:
	- Loading screen management
	- Game event handling (bets, bonuses)
	- Balance management
	- Game state coordination
	- UI rendering and layout

	This component serves as the root container for the entire game experience.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	// ===== CORE DEPENDENCIES =====
	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text } from 'pixi-svelte';
	import { stateModal, stateBet } from 'state-shared';
	import { bookEventAmountToNormalisedAmount } from 'utils-shared/amount';

	// ===== UI COMPONENTS =====
	import { UI, UiGameName } from 'components-ui-pixi-theme';
	import { GameVersion, Modals } from 'components-ui-html';

	// ===== GAME MODULES =====
	import { getContext } from '../game/context';
	import { playBet } from '../game/utils';
	import base_books from '../stories/data/base_books';

	// ===== GAME COMPONENTS =====
	import EnableSound from './EnableSound.svelte';
	import Sound from './Sound.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import Background from './Background.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';

	// ===== GAME CONTEXT =====
	const context = getContext();

	// Initialize loading screen on mount
	onMount(() => {
		context.stateLayout.showLoadingScreen = true;
	});

	// ===== EVENT HANDLERS =====
	/**
	 * Handle bet confirmation modal display
	 */
	const handleBuyBonusConfirm = () => {
		stateModal.modal = { name: 'buyBonusConfirm' };
	};

	/**
	 * Handle bet placement and game logic
	 * Manages balance deduction, book selection, and win processing
	 */
	const handleBet = async () => {
		const betCost = stateBet.betAmount;

		// Validate sufficient balance
		if (betCost > stateBet.balanceAmount) {
			return; // Insufficient funds
		}

		try {
			// Deduct bet cost and set wagered amount
			stateBet.wageredBetAmount = betCost;
			stateBet.balanceAmount -= betCost;

			// Select random game outcome from base books
			const randomBookIndex = Math.floor(Math.random() * base_books.length);
			const selectedBook = base_books[randomBookIndex];

			// Execute game sequence
			await playBet({
				...selectedBook,
				state: selectedBook.events as any // Type assertion for book events compatibility
			});

			// Process winnings and update balance
			const winAmount = bookEventAmountToNormalisedAmount(selectedBook.baseGameWins);
			stateBet.balanceAmount += winAmount;

		} catch (error) {
			// Handle game error gracefully
			console.error('Game error:', error);
			// Optionally restore bet amount on error
			stateBet.balanceAmount += betCost;
		}
	};

	// Subscribe to game events
	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: handleBuyBonusConfirm,
		bet: handleBet,
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
				<Text/>
			{/snippet}

		</UI>
		<Win />
		
	{/if}
</App>

<Modals>
	{#snippet version()}
		<GameVersion version="0.0.0" />
	{/snippet}
</Modals>
