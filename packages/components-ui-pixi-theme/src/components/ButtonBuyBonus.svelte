<script lang="ts">
	import { Text, Graphics } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';
	import * as PIXI from 'pixi.js';

	import UiSprite from './UiSprite.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';
	import { i18nDerived } from '../i18n/i18nDerived';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const { stateXstateDerived, eventEmitter } = getContext();
	const sizes = { width: UI_BASE_SIZE * 1.5, height: UI_BASE_SIZE };
	const disabled = $derived(!stateXstateDerived.isIdle());
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');

	const openModal = () => (stateModal.modal = { name: 'buyBonus' });
	const disableActiveBetMode = () => (stateBet.activeBetModeKey = 'BASE');
	const onpress = () => {
		eventEmitter.broadcast({ type: 'soundPressGeneral' });

		if (active) {
			disableActiveBetMode();
		} else {
			openModal();
		}
	};

	const getState = (value: {
		active: boolean;
		disabled: boolean;
		hovered: boolean;
		pressed: boolean;
	}) => {
		if (value.disabled) return 'disabled' as const;
		if (value.pressed) return 'pressed' as const;
		if (value.hovered) return 'hovered' as const;
		if (value.active) return 'active' as const;
		return 'default' as const;
	};

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

<Button {...props} {sizes} {disabled} {onpress}>
	{#snippet children({ center, hovered, pressed })}
		{@const state = getState({
			active,
			disabled,
			hovered,
			pressed,
		})}

		<Graphics
			x={center.x - sizes.width / 2}
			y={center.y - sizes.height / 2}
			draw={(graphics) => drawGradientBackground(
				graphics,
				sizes.width,
				sizes.height,
				35
			)}
		/>

		<Text
			{...center}
			anchor={0.5}
			text={state === 'active' ? i18nDerived.disable() : i18nDerived.buyBonus()}
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
	{/snippet}
</Button>
