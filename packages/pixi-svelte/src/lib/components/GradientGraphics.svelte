<script lang="ts" module>
	import * as PIXI from 'pixi.js';
	import type { OverwriteCursor } from '../types';

	export type GradientColorStop = {
		offset: number;
		color: string;
	};

	export type Props = OverwriteCursor<PIXI.GraphicsOptions> & {
		isMask?: boolean;
		width: number;
		height: number;
		borderRadius?: number;
		gradientStops: GradientColorStop[];
		strokeColor?: number;
		strokeWidth?: number;
		strokeAlpha?: number;
	};
</script>

<script lang="ts">
	import { propsSyncEffect } from '../utils.svelte';
	import { getContextParent } from '../context.svelte';

	const props: Props = $props();
	const parentContext = getContextParent();
	const graphics = new PIXI.Graphics();

	propsSyncEffect({
		props,
		target: graphics,
		ignore: ['isMask', 'width', 'height', 'borderRadius', 'gradientStops', 'strokeColor', 'strokeWidth', 'strokeAlpha']
	});

	$effect(() => {
		if (props.isMask !== undefined) {
			parentContext.parent.mask = props.isMask ? graphics : null;
		}
	});

	$effect(() => {
		graphics.clear();

		// Create linear gradient from top to bottom
		const gradient = new PIXI.FillGradient(0, 0, 0, props.height);

		// Add color stops
		props.gradientStops.forEach(stop => {
			gradient.addColorStop(stop.offset, stop.color);
		});

		// Draw the rounded rectangle with gradient fill
		const borderRadius = props.borderRadius ?? 0;
		graphics.roundRect(0, 0, props.width, props.height, borderRadius);
		graphics.fill(gradient);

		// Add stroke if specified
		if (props.strokeColor !== undefined) {
			graphics.roundRect(0, 0, props.width, props.height, borderRadius);
			graphics.stroke({
				color: props.strokeColor,
				width: props.strokeWidth ?? 1,
				alpha: props.strokeAlpha ?? 1,
			});
		}
	});

	parentContext.addToParent(graphics);
</script>