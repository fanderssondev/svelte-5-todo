<script lang="ts">
	// type Filters = 'all' | 'unfinished' | 'finished';

	// interface Props {
	// 	filter: Filters;
	// 	unfinished: number;
	// 	clearFinishedTodos: () => void;
	// }

	let { filter, unfinished, clearFinishedTodos } = $props();
</script>

<div class="filters">
	<p><span>{unfinished}</span> unfinishied {unfinished === 1 ? 'todo' : 'todos'}</p>
	<button
		class:active-filter={filter === 'all'}
		class="filter-btn"
		disabled={filter === 'all'}
		onclick={() => (filter = 'all')}>All</button
	>
	<button
		class:active-filter={filter === 'unfinished'}
		class="filter-btn"
		disabled={filter === 'unfinished'}
		onclick={() => (filter = 'unfinished')}>Unfinishied</button
	>
	<button
		class:active-filter={filter === 'finished'}
		class="filter-btn"
		disabled={filter === 'finished'}
		onclick={() => (filter = 'finished')}>Finished</button
	>
	<button class="clear-btn" onclick={clearFinishedTodos}>Clear Finished</button>
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
			cursor: pointer;
			line-height: 1;
			transition:
				transform 200ms,
				background 200ms;

			&:not([disabled]):hover {
				transform: translateY(-2px);
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
