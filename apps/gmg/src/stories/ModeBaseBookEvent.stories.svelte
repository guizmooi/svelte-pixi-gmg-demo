<script lang="ts">
	import { StoryLocale } from 'components-storybook';
	import { Story } from '@storybook/addon-svelte-csf';
	import { createPlayBookUtils } from 'utils-book';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { bookEventHandlerMap } from '../game/bookEventHandlerMap';
	import events from './data/base_events';

	setContext();

	const { playBookEvent } = createPlayBookUtils({ bookEventHandlerMap });

	const templateArgs = (overrides: any = {}) => ({
		skipLoadingScreen: true,
		...overrides
	});
</script>

<Story
	name="reveal"
	args={templateArgs({
		data: events.reveal,
		action: async (data: any) => await playBookEvent(data, { bookEvents: [] })
	})}
>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>

<Story
	name="setTotalWin"
	args={templateArgs({
		data: events.setTotalWin,
		action: async (data: any) => await playBookEvent(data, { bookEvents: [] })
	})}
>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>

<Story
	name="finalWin"
	args={templateArgs({
		data: events.finalWin,
		action: async (data: any) => await playBookEvent(data, { bookEvents: [] })
	})}
>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>