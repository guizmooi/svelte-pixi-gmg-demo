<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'COMPONENTS/<Board>',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { eventEmitter } from '../game/eventEmitter';

	setContext();
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			await args.action?.(args.data);
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story
	name="board show"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			eventEmitter.broadcast({ type: 'boardShow' });
		},
	})}
	{template}
/>

<Story
	name="board hide"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			eventEmitter.broadcast({ type: 'boardHide' });
		},
	})}
	{template}
/>

<Story
	name="anticipation"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			eventEmitter.broadcast({
				type: 'anticipationShow',
				reelIndex: 1,
				position: { x: 100, y: 100 }
			});
		},
	})}
	{template}
/>