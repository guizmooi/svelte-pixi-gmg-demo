<script lang="ts">
	import { StoryLocale } from 'components-storybook';
	import { Story } from '@storybook/addon-svelte-csf';
	import { createPlayBookUtils } from 'utils-book';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { bookEventHandlerMap } from '../game/bookEventHandlerMap';
	import base_books from './data/base_books';

	setContext();

	const { playBookEvents } = createPlayBookUtils({ bookEventHandlerMap });

	const templateArgs = (overrides: any = {}) => ({
		skipLoadingScreen: true,
		...overrides
	});
</script>

<Story
	name="random"
	args={templateArgs({
		action: async () => {
			const randomBook = base_books[Math.floor(Math.random() * base_books.length)];
			await playBookEvents(randomBook.events, { bookEvents: randomBook.events });
		}
	})}
>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>