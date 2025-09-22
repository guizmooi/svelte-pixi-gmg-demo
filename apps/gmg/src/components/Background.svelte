<!--
	@component Background

	Manages the background visuals for the GMG game, including:
	- Base background for normal gameplay
	- Feature background for bonus/free game modes
	- Dynamic background switching based on game state

	@example
	```svelte
	<Background />
	```
-->
<script lang="ts">
	import { Rectangle, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	// ===== CONTEXT & STATE =====
	const context = getContext();

	// Derived layout properties for background positioning and scaling
	const backgroundProps = $derived(
		context.stateLayoutDerived.normalBackgroundLayout({ scale: 0.5 }),
	);

	// Reactive visibility states based on game type
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freegame');

	// ===== CONSTANTS =====
	const BACKGROUND_Z_INDEX = {
		BASE: -3,
		NORMAL: -2,
		FEATURE: -1,
	} as const;

	const ANIMATION_CONFIG = {
		IDLE: 'idle',
		DUST: 'dust',
		FADE_DURATION: SECOND,
	} as const;
</script>

<!-- Base black background canvas -->
<Rectangle
	{...context.stateLayoutDerived.canvasSizes()}
	backgroundColor={0x000000}
	zIndex={BACKGROUND_Z_INDEX.BASE}
/>

<!-- Base game background with fade transition -->
<FadeContainer
	show={showBaseBackground}
	duration={ANIMATION_CONFIG.FADE_DURATION}
	zIndex={BACKGROUND_Z_INDEX.NORMAL}
>
	<!-- Primary background animation -->
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={ANIMATION_CONFIG.IDLE} loop />
	</SpineProvider>

	<!-- Atmospheric dust effect -->
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={ANIMATION_CONFIG.DUST} loop />
	</SpineProvider>
</FadeContainer>

<!-- Feature game background with fade transition -->
<FadeContainer
	show={showFeatureBackground}
	duration={ANIMATION_CONFIG.FADE_DURATION}
	zIndex={BACKGROUND_Z_INDEX.FEATURE}
>
	<!-- Primary feature background animation -->
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={ANIMATION_CONFIG.IDLE} loop />
	</SpineProvider>

	<!-- Feature atmospheric dust effect -->
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={ANIMATION_CONFIG.DUST} loop />
	</SpineProvider>
</FadeContainer>