<script lang="ts">
	import { Text, Graphics } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import * as PIXI from 'pixi.js';

	import UiSprite from './UiSprite.svelte';
	import type { ButtonIcon } from '../types';
	import type { Snippet } from 'svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = Omit<ButtonProps, 'children'> & {
		icon: ButtonIcon;
		sizes: { width: number; height: number };
		active?: boolean;
		children?: Snippet;
		variant?: 'dark' | 'light';
	};

	const {
		icon,
		active,
		variant = 'dark',
		children: childrenFromParent,
		...buttonProps
	}: Props = $props();

	// Create gradient background function from UiLabel
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
</script>

<Button {...buttonProps}>
	{#snippet children({ center, hovered, pressed })}
		<Graphics
			x={center.x - buttonProps.sizes.width / 2}
			y={center.y - buttonProps.sizes.height / 2}
			draw={(graphics) => drawGradientBackground(
				graphics,
				buttonProps.sizes.width,
				buttonProps.sizes.height,
				35
			)}
		/>

		<Text
			{...center}
			anchor={0.5}
			text={i18nDerived[icon]()}
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

		{@render childrenFromParent?.()}
	{/snippet}
</Button>
