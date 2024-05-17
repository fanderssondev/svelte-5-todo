<script lang="ts">
	import 'iconify-icon';
	import { page } from '$app/stores';

	import { useStorage } from '$lib/stores/useStorage';
	import { enhance } from '$app/forms';

	// let todos = useStorage<Todo[]>('todos', []);

	// interface Todo {
	// 	id: string;
	// 	text: string;
	// 	completed: boolean;
	// 	userId: string;
	// 	editing: boolean;
	// }

	let todos = $state<Todo[]>($page.data.todos ?? []);

	let unfinished = $derived(todos.filter((todo) => !todo.completed).length);

	type Filters = 'all' | 'unfinished' | 'finished';
	let filter: Filters = $state('all');

	let filteredTodos = $derived<Todo[]>(setFilter(filter));

	function setFilter(newFilter: Filters): Todo[] {
		switch (newFilter) {
			case 'all':
				return [...todos];
			case 'unfinished':
				return todos.filter((todos) => !todos.completed);
			case 'finished':
				return todos.filter((todos) => todos.completed);
		}
	}

	function clearFinishedTodos() {
		todos = todos.filter((todo) => !todo.completed);
	}

	function toggleCompleted(id: string): void {
		todos.map((todo) => (todo.id === id ? (todo.completed = !todo.completed) : todo));
	}

	function toggleEditing(id: string): void {
		const index = todos.findIndex((todo) => todo.id == id);
		todos[index].editing = !todos[index].editing;
	}

	function editTodo(id: string, e: KeyboardEvent): void {
		const inputElement = e.target as HTMLInputElement;
		const index = todos.findIndex((todo) => todo.id == id);

		if (e.key === 'Escape') {
			todos[index].editing = false;
			inputElement.blur();
		}
		if (e.key !== 'Enter') return;

		todos[index].text = inputElement.value;
		todos[index].editing = false;
		todos[index].completed = false;
		inputElement.blur();
	}

	function handleBlur(event: FocusEvent, id: string): void {
		const targetElement = event.target as HTMLInputElement;

		console.log(targetElement.value);

		const index = todos.findIndex((todo) => todo.id == id);
		todos[index].editing = false;
		targetElement.blur();
	}

	function deleteTodo(id: string): void {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<!-- <pre>
   {JSON.stringify(filteredTodos, null, 2)}
</pre> -->

<h1>Todos</h1>

// BUG use:enhance don't update list
<form action="?/create" method="post" use:enhance>
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
	<button class="clear-btn" onclick={clearFinishedTodos}>Clear Finished</button>
</div>

<ul>
	{#each filteredTodos as todo}
		<li class:completed={todo.completed}>
			<form action="?/toggleCompleted" method="post" use:enhance>
				<input type="hidden" name="id" value={todo.id} />
				<input type="hidden" name="completed" value={todo.completed} />
				<button aria-label="Toggle todo completed">
					{#if todo.completed}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<iconify-icon
							icon="mdi:checkbox-marked-outline"
							onclick={() => toggleCompleted(todo.id)}
						></iconify-icon>
					{:else}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<iconify-icon icon="mdi:checkbox-blank-outline" onclick={() => toggleCompleted(todo.id)}
						></iconify-icon>
					{/if}
				</button>
			</form>

			{#if todo.editing}
				<form action="?/update" method="post">
					<input type="hidden" name="id" value={todo.id} />
					<input type="text" name="text" autofocus value={todo.text} />
				</form>
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span ondblclick={() => toggleEditing(todo.id)}>{todo.text}</span>
				<button onclick={() => deleteTodo(todo.id)}>
					<iconify-icon class="delete-icon" icon="mdi:delete-forever-outline"></iconify-icon>
				</button>
			{/if}
		</li>
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

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
		padding-left: 3em;
		background-color: hsl(var(--clr-primary-300));
		border-radius: 5px;

		input,
		span {
			background-color: transparent;

			&:before {
				content: '\00a0';
			}

			&:after {
				content: '\00a0\00a0\00a0';
			}
		}

		span {
			padding-right: 2rem;
		}

		& iconify-icon {
			position: absolute;
			display: inline-block;
			font-size: 2em;
			left: 0.5em;
			top: 50%;
			transform: translateY(-50%);
		}

		& .delete-icon {
			left: auto;
			right: 0.5em;
			opacity: 0.5;

			&:hover {
				opacity: 1;
			}
		}

		&.completed {
			opacity: 0.4;
			text-decoration: line-through;
		}

		&:has(input:focus) {
			outline: 3px solid hsl(var(--clr-primary-700));
		}
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

	/* Used to be able to have content visually hidden but readable for screen readers */
	.sr-only {
		position: absolute;
		left: -10000px;
		top: auto;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
