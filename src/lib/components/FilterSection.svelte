<script lang="ts">
	import { enhance } from '$app/forms';

	import type { Filter } from '$lib/types';

	interface Props {
		unfinished: number;
		activeFilter: Filter;
		setFilter: (newFilter: Filter) => void;
	}

	let { unfinished, activeFilter, setFilter }: Props = $props();
</script>

<div class="filters">
	<p><span>{unfinished}</span> unfinishied {unfinished === 1 ? 'todo' : 'todos'}</p>

	<select bind:value={activeFilter} onchange={() => setFilter(activeFilter)}>
		<option value="all">All</option>
		<option value="unfinished">Unfinished</option>
		<option value="finished">Finished</option>
	</select>

	<form action="?/clearFinished" method="post" use:enhance>
		<button class="clear-btn" onclick={() => setFilter('all')}>Clear Finished</button>
	</form>
</div>

<style>
	.filters {
		margin-top: 4rem;
		margin-bottom: 4rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1rem 1rem;
		background-color: hsl(var(--clr-primary-300));
		border-radius: 5px;
		font-size: 1.25rem;

		p {
			font-family: 'Roboto';
			font-size: 1.25rem;
			letter-spacing: 2px;
			color: hsl(var(--clr-primary-700));
			grid-area: stats;

			& span {
				padding: 0;
				color: hsl(var(--clr-primary-800));
			}
		}

		& button {
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

		select {
			background-color: hsl(var(--clr-primary-400));
			border: none;
			padding: 0.5em 0.7em;
			border-radius: 2px;
			font-size: 1.25rem;
			font-family: Roboto slab;
			font-weight: 400;
			letter-spacing: 3px;
			color: hsl(var(--clr-primary-800));
			margin-left: auto;
		}

		option {
			border-radius: 2px;
		}

		& .clear-btn {
			background: transparent;
			color: hsl(var(--clr-primary-800));
			box-shadow: 0 0 0 3px hsl(var(--clr-primary-800));
		}
	}
</style>
