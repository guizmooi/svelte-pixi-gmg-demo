<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { stateBet } from 'state-shared';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import { i18nDerived } from '../i18n/i18nDerived';
	import UiLabel from './UiLabel.svelte';

	type Props = {
		stacked?: boolean;
	};

	const props: Props = $props();
	const balanceTween = new Tween(stateBet.balanceAmount);
	const label = $derived(i18nDerived.balance().toUpperCase());
	const value = $derived(numberToCurrencyString(balanceTween.current).toUpperCase());

	$effect(() => {
		balanceTween.set(stateBet.balanceAmount);
	});
</script>

<UiLabel {label} {value} stacked={props.stacked} />
