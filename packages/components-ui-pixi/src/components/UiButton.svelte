<script lang="ts">
	import { Text, GradientGraphics } from 'pixi-svelte';
	import { Button, type ButtonProps } from 'components-pixi';

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

	// Gradient configuration
	const gradientStops = [
		{ offset: 0, color: '#0000003d' }, // Top color with transparency
		{ offset: 1, color: '#00000029' }, // Bottom color with transparency
	];
</script>

<Button {...buttonProps}>
	{#snippet children({ center, hovered, pressed }: any)}
		<GradientGraphics
			x={center.x - buttonProps.sizes.width / 2}
			y={center.y - buttonProps.sizes.height / 2}
			width={buttonProps.sizes.width}
			height={buttonProps.sizes.height}
			borderRadius={35}
			{gradientStops}
			strokeColor={0x909090}
			strokeWidth={3}
			strokeAlpha={1}
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
