<script lang="ts">
	import { Text, Graphics } from 'pixi-svelte';
	import * as PIXI from 'pixi.js';
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
</script>

{#if props.stacked}
	<Graphics
		y={-20}
		x={-(UI_BASE_FONT_SIZE * 3 * (326 / 73)) / 2}
		filters={containerFilters}
		draw={(graphics) => drawGradientBackground(
			graphics,
			UI_BASE_FONT_SIZE * 3 * (326 / 73),
			UI_BASE_FONT_SIZE * 3,
			35
		)}
	/>
	<Text anchor={{ x: 0.5, y: 0 }} text={props.label.toUpperCase()} style={labelStyle} />
	<Text anchor={{ x: 0.5, y: 0 }} text={props.value.toUpperCase()} style={valueStyle} y={UI_BASE_FONT_SIZE} />
{:else}
	<Graphics
		x={-90}
		y={-(UI_BASE_FONT_SIZE * 3) / 2}
		filters={containerFilters}
		draw={(graphics) => drawGradientBackground(
			graphics,
			UI_BASE_FONT_SIZE * 3 * (326 / 73),
			UI_BASE_FONT_SIZE * 3,
			35
		)}
	/>
	<Text anchor={{ x: 0, y: 0.5 }} text={props.label.toUpperCase()} style={labelStyle} />
	<Text
		anchor={{ x: 1, y: 0.5 }}
		text={props.value.toUpperCase()}
		style={valueStyle}
		x={UI_BASE_FONT_SIZE * 10}
	/>
{/if}
