<script lang="ts">
	import { Rectangle, type RectangleProps } from 'pixi-svelte';

	type Props = RectangleProps;
	const props: Props = $props();
</script>

<Rectangle borderRadius={50} {...props} />
