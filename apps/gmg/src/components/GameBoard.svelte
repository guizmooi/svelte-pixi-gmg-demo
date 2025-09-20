<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import { REM } from 'constants-shared';

	type Props = {
		symbols: string[];
		isSpinning: boolean;
	};

	let { symbols, isSpinning }: Props = $props();

	const symbolColors = {
		'🍒': 0xff0000,
		'🍋': 0xffff00,
		'🍊': 0xff8800,
		'🍇': 0x8800ff,
		'⭐': 0xffd700,
		'💎': 0x00ffff,
		'?': 0x888888
	};
</script>

<Container>
	{#each symbols as symbol, index}
		<Container x={index * 120 - 120} y={0}>
			<Container
				x={0}
				y={0}
				width={100}
				height={100}
			>
				<!-- Background -->
				<Text
					text="█"
					style={{
						fontFamily: 'Arial',
						fontSize: REM * 6,
						fill: 0x34495e
					}}
					anchor={{ x: 0.5, y: 0.5 }}
				/>

				<!-- Symbol -->
				<Text
					text={symbol}
					style={{
						fontFamily: 'Arial',
						fontSize: REM * 3,
						fill: symbolColors[symbol as keyof typeof symbolColors] || 0xffffff
					}}
					anchor={{ x: 0.5, y: 0.5 }}
					alpha={isSpinning ? 0.5 : 1}
				/>
			</Container>
		</Container>
	{/each}
</Container>