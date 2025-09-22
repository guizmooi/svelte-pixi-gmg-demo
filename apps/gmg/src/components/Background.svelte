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
	import { Rectangle, SpineProvider, SpineTrack, Container, Sprite, Graphics } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';
	import { onMount } from 'svelte';

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

	// ===== MECHANICAL SHARK ANIMATION STATE =====
	let animationTime = $state(0);
	let animationFrame: number;
	let lastSharkTime = $state(-20000); // Start with negative time to trigger initial animation
	let sharkVisible = $state(false);

	// Shark animation properties
	const sharkState = $state({
		x: 0,
		y: 0,
		rotation: 0,
		scale: 0.2,
		finRotation: 0,
		eyeGlow: 0.5
	});

	// ===== CONSTANTS =====
	const BACKGROUND_Z_INDEX = {
		BASE: -3,
		NORMAL: -2,
		SHARK: -0.5, // Behind board but in front of background
		FEATURE: -1,
	} as const;

	const ANIMATION_CONFIG = {
		IDLE: 'idle',
		DUST: 'dust',
		FADE_DURATION: SECOND,
	} as const;

	const SHARK_CONFIG = {
		SPEED: 3.0, // Very fast movement speed
		SIZE: 500, // Larger size for better visibility
		ANIMATION_CYCLE: 800, // 0.8 seconds for very fast movement
		APPEARANCE_INTERVAL: 20000, // Appear every 20 seconds
		SCALE_SPEED: 8.0, // Fast scaling from 0.2 to 1.0
		IMAGE_KEY: 'mechanical_shark', // Image key for pixi-svelte (matches assets.ts)
	} as const;

	// ===== ANIMATION FUNCTIONS =====
	/**
	 * Update shark animation state
	 */
	function animateShark() {
		animationTime += 16; // ~60fps

		// Check if it's time for shark to appear (rare intervals)
		if (animationTime - lastSharkTime >= SHARK_CONFIG.APPEARANCE_INTERVAL) {
			sharkVisible = true;
			lastSharkTime = animationTime;
			// Ensure shark starts at scale 0.2
			sharkState.scale = 0.2;
		}

		// Only animate shark when visible
		if (sharkVisible) {
			const canvasWidth = context.stateLayoutDerived.canvasSizes().width;
			const canvasHeight = context.stateLayoutDerived.canvasSizes().height;

			// Calculate animation progress for current cycle
			const timeSinceStart = animationTime - lastSharkTime;
			const progress = Math.min(timeSinceStart / SHARK_CONFIG.ANIMATION_CYCLE, 1);

			// Movement path: middle left to bottom right
			const startX = -SHARK_CONFIG.SIZE * 0.5; // Start slightly off-screen left
			const endX = canvasWidth + SHARK_CONFIG.SIZE * 0.5; // End slightly off-screen right
			const startY = canvasHeight * 0.5; // Start at middle
			const endY = canvasHeight * 0.9; // End at bottom

			// Smooth easing for natural movement
			const easedProgress = 0.5 * (1 - Math.cos(progress * Math.PI));

			sharkState.x = startX + (endX - startX) * easedProgress;
			sharkState.y = startY + (endY - startY) * easedProgress;

			// Subtle rotation for natural swimming motion
			sharkState.rotation = Math.sin(timeSinceStart * 0.001) * 0.05;

			// Scale from 0.2 to 1.0 during animation
			const scaleProgress = progress; // Use normal progress (0 to 1)
			sharkState.scale = 0.2 + (scaleProgress * 0.8); // Scale from 0.2 to 1.0

			// Hide shark when animation completes
			if (progress >= 1) {
				sharkVisible = false;
			}

			// Debug logging when shark is visible
			if (timeSinceStart % 500 < 16) {
				console.log('🦈 Rare shark diving (left-top to right-bottom):', {
					x: sharkState.x.toFixed(0),
					y: sharkState.y.toFixed(0),
					scale: sharkState.scale.toFixed(2),
					progress: (progress * 100).toFixed(0) + '%'
				});
			}
		}

		animationFrame = requestAnimationFrame(animateShark);
	}


	// ===== LIFECYCLE =====
	onMount(() => {
		console.log('🦈 Mechanical shark animation started - key: "mechanical_shark"');
		console.log('If you see asset loading errors, restart the dev server to reload assets');
		animateShark();

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});
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

<!-- Animated Mechanical Shark (rarely visible) -->
{#if sharkVisible}
	<Container
		x={sharkState.x}
		y={sharkState.y}
		rotation={sharkState.rotation}
		scale={sharkState.scale}
		zIndex={BACKGROUND_Z_INDEX.SHARK}
	>
		<!-- Your mechanical shark image -->
		<Sprite
			key="mechanical_shark"
			anchor={{ x: 0.5, y: 0.5 }}
			width={SHARK_CONFIG.SIZE}
			height={SHARK_CONFIG.SIZE}
			alpha={1.0}
		/>
	</Container>
{/if}