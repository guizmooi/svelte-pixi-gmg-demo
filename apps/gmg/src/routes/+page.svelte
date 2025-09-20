<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let Game: any;
	let gameLoaded = false;

	onMount(async () => {
		if (browser) {
			try {
				const [gameModule, contextModule] = await Promise.all([
					import('../components/Game.svelte'),
					import('../game/context')
				]);

				Game = gameModule.default;
				contextModule.setContext();
				gameLoaded = true;
			} catch (error) {
				console.error('Failed to load game:', error);
			}
		}
	});
</script>

{#if gameLoaded && Game}
	<svelte:component this={Game} />
{:else}
	<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial; font-size: 24px; background-color: #2c3e50; color: white;">
		Loading GMG Game...
	</div>
{/if}