<script lang="ts">
	import Todo from '$lib/components/Todo.svelte';

	let { data } = $props();

	// let todos = $state<Todo[]>($page.data.todos ?? []);

	type Filters = 'all' | 'unfinished' | 'finished';
	let filter: Filters = $state('all');

	// let filteredTodos = $derived(setFilter(data.todos, filter));
	let unfinished = $derived(data.todos.filter((todo) => !todo.completed).length);

	let editing = $state<string | null>(null);

	function setFilter(todos: Todo[], newFilter: Filters): Todo[] {
		switch (newFilter) {
			case 'all':
				return [...todos];
			case 'unfinished':
				return todos.filter((todos) => !todos.completed);
			case 'finished':
				return todos.filter((todos) => todos.completed);
		}
	}

	function toggleEditing(id: string) {
		if (!editing) {
			editing = id;
		} else {
			editing = null;
		}
	}

	function handleBlur(event: FocusEvent, id: string): void {
		const targetElement = event.target as HTMLInputElement;

		console.log(targetElement.value);
		targetElement.blur();
	}

	function deleteTodo(id: string): void {
		data.todos = data.todos.filter((todo) => todo.id !== id);
	}
</script>

<!-- <pre>
   {JSON.stringify(data.todos, null, 2)}
</pre> -->

<h1>Todos</h1>

<!-- BUG use:enhance don't update list -->
<form action="?/create" method="post">
	<!-- svelte-ignore a11y_autofocus -->
	<input class="input-form" type="text" name="text" autofocus placeholder="Add todo" />
</form>

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
	<button class="clear-btn">Clear Finished</button>
</div>

<ul>
	<!-- FIXME Change for filteredTodos -->
	{#each data.todos as todo (todo.id)}
		<Todo {todo} {editing} {toggleEditing} />
	{/each}
</ul>

<style>
	h1 {
		text-align: center;
		font-size: 5rem;
		letter-spacing: 4px;
		margin-bottom: 3rem;
	}

	.input-form {
		margin-bottom: 2rem;
		background-color: hsl(var(--clr-primary-300));
	}

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
