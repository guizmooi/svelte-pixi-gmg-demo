<script lang="ts">
	import { Container, Text, GradientGraphics } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { stateBetDerived } from 'state-shared';

	import ButtonBetProvider from './ButtonBetProvider.svelte';
	import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
	import { i18nDerived } from '../i18n/i18nDerived';

	// Gradient configuration
	const gradientStops = [
		{ offset: 0, color: '#0000003d' }, // Top color with transparency
		{ offset: 1, color: '#00000029' }, // Bottom color with transparency
	];

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());
	const sizes = { width: UI_BASE_SIZE, height: UI_BASE_SIZE };
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress }: any)}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button {...props} {sizes} {onpress} {disabled}>
			{#snippet children({ center, hovered }: any)}
				<Container {...center}>
					<GradientGraphics
						x={-sizes.width / 2}
						y={-sizes.height / 2}
						width={sizes.width}
						height={sizes.height}
						borderRadius={35}
						{gradientStops}
						strokeColor={0x909090}
						strokeWidth={3}
						strokeAlpha={1}
					/>
					<Text
						x={0}
						y={0}
						anchor={0.5}
						text={['spin_default', 'spin_disabled'].includes(key)
							? i18nDerived.bet().toUpperCase()
							: i18nDerived.stop().toUpperCase()}
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
	{/snippet}
</ButtonBetProvider>
