<script lang="ts">
	import { Text, GradientGraphics } from 'pixi-svelte';
	import { BRIGHT_YELLOW } from 'constants-shared/colors';
	import { UI_BASE_FONT_SIZE } from '../constants';

	type Props = {
		label: string;
		value: string;
		tiled?: boolean;
		stacked?: boolean;
	};

	const props: Props = $props();

	const labelStyle = {
		fontFamily: 'proxima-nova',
		fontSize: UI_BASE_FONT_SIZE * 0.8,
		fill: 0xFFFFFF,
		fontWeight: 'bold',
		dropShadow: {
			blur: 2,
			quality: 3,
			distance: 1,
			angle: Math.PI / 4,
			color: 0x000000,
			alpha: 0.3,
		},
	} as const;

	const valueStyle = {
		fontFamily: 'proxima-nova',
		fontSize: UI_BASE_FONT_SIZE * 1.2,
		fill: 0xFFFFFF,
		fontWeight: 'bold',
		dropShadow: {
			blur: 2,
			quality: 3,
			distance: 1,
			angle: Math.PI / 4,
			color: 0x000000,
			alpha: 0.3,
		},
	} as const;

	// Gradient configuration
	const gradientStops = [
		{ offset: 0, color: '#0000003d' }, // Top color with transparency
		{ offset: 1, color: '#00000029' }, // Bottom color with transparency
	];
</script>

{#if props.stacked}
	<GradientGraphics
		y={-20}
		x={-(UI_BASE_FONT_SIZE * 3 * (326 / 73)) / 2}
		width={UI_BASE_FONT_SIZE * 3 * (326 / 73)}
		height={UI_BASE_FONT_SIZE * 3}
		borderRadius={35}
		{gradientStops}
		strokeColor={0x909090}
		strokeWidth={3}
		strokeAlpha={1}
	/>
	<Text anchor={{ x: 0.5, y: 0 }} text={props.label.toUpperCase()} style={labelStyle} />
	<Text anchor={{ x: 0.5, y: 0 }} text={props.value.toUpperCase()} style={valueStyle} y={UI_BASE_FONT_SIZE} />
{:else}
	<GradientGraphics
		x={-90}
		y={-(UI_BASE_FONT_SIZE * 3) / 2}
		width={UI_BASE_FONT_SIZE * 3 * (326 / 73)}
		height={UI_BASE_FONT_SIZE * 3}
		borderRadius={35}
		{gradientStops}
		strokeColor={0x909090}
		strokeWidth={3}
		strokeAlpha={1}
	/>
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label.toUpperCase()} style={labelStyle} />
	<Text
		anchor={{ x: 1, y: 0.5 }}
		text={props.value.toUpperCase()}
		style={valueStyle}
		x={UI_BASE_FONT_SIZE * 10}
	/>
{/if}
