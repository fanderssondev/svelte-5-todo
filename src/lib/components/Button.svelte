<script lang="ts">
	type Filter = 'all' | 'unfinished' | 'finished';

	interface Props {
		children?: any;
		disabled?: boolean;
		active?: boolean;
		filter?: boolean;
		clear?: boolean;
		setFilter?: (newFilter: Filter) => void;
		val?: Filter;
	}

	let { children, disabled, active, setFilter, val, filter, clear }: Props = $props();
</script>

{#if setFilter && val}
	<button
		class:active-filter={active}
		class:filter-btn={filter}
		class:clear-btn={clear}
		{disabled}
		onclick={() => setFilter(val)}>{@render children()}</button
	>
{:else}
	<button class:active-filter={active} class:filter-btn={filter} class:clear-btn={clear} {disabled}
		>{@render children()}</button
	>
{/if}

<style>
	button {
		background-color: red;
		border-radius: 5px;
		font-size: inherit;
		padding: 14px 24px 16px;
		font-weight: 500;
		letter-spacing: 3px;
		display: inline-block;
		outline: 0;
		border: 0;

		line-height: 1;
		transition:
			transform 200ms,
			background 200ms;

		&:not([disabled]):hover {
			transform: translateY(-2px);
			cursor: pointer;
		}
	}

	.filter-btn {
		color: hsl(var(--clr-primary-200));
		background: hsl(var(--clr-accent-700));

		&.active-filter {
			color: hsl(var(--clr-primary-800));
			background: hsl(var(--clr-accent-600));
			border: 2px solid hsl(var(--clr-primary-800));
		}
	}

	.clear-btn {
		background: transparent;
		color: hsl(var(--clr-primary-800));
		box-shadow: 0 0 0 3px hsl(var(--clr-primary-800)) inset;
	}
</style>
