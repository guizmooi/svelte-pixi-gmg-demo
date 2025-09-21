<script lang="ts">
	import { Container, Text, Graphics } from 'pixi-svelte';
	import * as PIXI from 'pixi.js';
	import { Button, type ButtonProps } from 'components-pixi';
	import { stateBet, stateBetDerived } from 'state-shared';
	import { BRIGHT_YELLOW } from 'constants-shared/colors';

	import { UI_BASE_SIZE, UI_BASE_FONT_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { getContext } from '../context';

	// Create gradient background
	const drawGradientBackground = (graphics: PIXI.Graphics, width: number, height: number, borderRadius: number) => {
		// Create linear gradient from top to bottom
		const gradient = new PIXI.FillGradient(0, 0, 0, height);
		gradient.addColorStop(0, '#0000003d'); // Top color with transparency
		gradient.addColorStop(1, '#00000029'); // Bottom color with transparency

		graphics.roundRect(0, 0, width, height, borderRadius);
		graphics.fill(gradient);

		// Add solid border effect
		graphics.roundRect(0, 0, width, height, borderRadius);
		graphics.stroke({
			color: 0x909090,
			width: 3,
			alpha: 1,
		});
	};

	// Create blur filter for backdrop effect
	const blurFilter = new PIXI.BlurFilter({
		strength: 2,
		quality: 4,
	});

	const containerFilters: PIXI.Filter[] = [];

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE * 1.3, height: UI_BASE_SIZE };
	const active = $derived(stateBet.isTurbo);
	const disabled = $derived(stateBet.isSpaceHold);

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
	};

	context.eventEmitter.subscribeOnMount({
		stopButtonClick: () => stateBetDerived.updateIsTurbo(true, { persistent: false }),
		stopButtonEnable: () => stateBetDerived.updateIsTurbo(false, { persistent: false }),
	});
</script>

<Button {...props} {sizes} {onpress} {disabled}>
	{#snippet children({ center, hovered })}
		<Container {...center}>
			<Graphics
				x={-sizes.width / 2}
				y={-sizes.height / 2}
				filters={containerFilters}
				draw={(graphics) => drawGradientBackground(
					graphics,
					sizes.width,
					sizes.height,
					35
				)}
			/>
			<Text
				x={0}
				y={0}
				anchor={0.5}
				text={i18nDerived.turbo().toUpperCase()}
				style={{
					align: 'center',
					wordWrap: true,
					wordWrapWidth: 200,
					fontFamily: 'proxima-nova',
					fontWeight: 'bold',
					fontSize: UI_BASE_FONT_SIZE * 0.9,
					fill: 0xFFFFFF,
					dropShadow: {
						blur: 2,
						quality: 3,
						distance: 1,
						angle: Math.PI / 4,
						color: 0x000000,
						alpha: 0.3,
					},
				}}
			/>
		</Container>
	{/snippet}
</Button>
