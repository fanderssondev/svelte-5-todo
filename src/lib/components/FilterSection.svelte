<script lang="ts">
	import { enhance } from '$app/forms';

	type Filter = 'all' | 'unfinished' | 'finished';

	interface Props {
		unfinished: number;
		filter: Filter;
		setFilter: (newFilter: Filter) => void;
	}

	let { unfinished, filter, setFilter }: Props = $props();
</script>

<div class="filters">
	<p><span>{unfinished}</span> unfinishied {unfinished === 1 ? 'todo' : 'todos'}</p>
	<button
		class:active-filter={filter === 'all'}
		class="filter-btn"
		disabled={filter === 'all'}
		onclick={() => setFilter('all')}>All</button
	>
	<button
		class:active-filter={filter === 'unfinished'}
		class="filter-btn"
		disabled={filter === 'unfinished'}
		onclick={() => setFilter('unfinished')}>Unfinishied</button
	>
	<button
		class:active-filter={filter === 'finished'}
		class="filter-btn"
		disabled={filter === 'finished'}
		onclick={() => setFilter('finished')}>Finished</button
	>
	<form action="?/clearFinished" method="post" use:enhance>
		<button class="clear-btn" onclick={() => setFilter('all')}>Clear Finished</button>
	</form>
</div>

<style>
	/* Filter buttons */
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
			flex: 1;
			font-family: 'Roboto';
			font-size: 1.25rem;
			letter-spacing: 2px;
			color: hsl(var(--clr-primary-700));

			& span {
				padding: 0;
				color: hsl(var(--clr-primary-800));
			}
		}

		& button {
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

		& .filter-btn {
			color: hsl(var(--clr-primary-200));
			background: hsl(var(--clr-accent-700));

			&.active-filter {
				color: hsl(var(--clr-primary-800));
				background: hsl(var(--clr-accent-600));
				border: 2px solid hsl(var(--clr-primary-800));
			}
		}

		& .clear-btn {
			background: transparent;
			color: hsl(var(--clr-primary-800));
			box-shadow: 0 0 0 3px hsl(var(--clr-primary-800)) inset;
		}
	}
</style>
