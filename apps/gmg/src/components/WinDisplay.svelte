<script lang="ts">
	import { Container, Text } from 'pixi-svelte';
	import { REM } from 'constants-shared';

	type Props = {
		currentWin: number;
	};

	let { currentWin }: Props = $props();
</script>

<Container>
	<Text
		text={`WIN: ${currentWin}`}
		style={{
			fontFamily: 'Arial',
			fontSize: REM * 1.5,
			fontWeight: 'bold',
			fill: currentWin > 0 ? 0x00ff00 : 0xffffff
		}}
		anchor={{ x: 0.5, y: 0 }}
	/>
</Container>