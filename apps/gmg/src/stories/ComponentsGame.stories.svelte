<script lang="ts">
	import { StoryLocale } from 'components-storybook';
	import { Story } from '@storybook/addon-svelte-csf';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';

	setContext();
</script>

<Story
	name="component (game)"
	args={{}}
>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>