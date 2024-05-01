<script lang="ts">
	import 'iconify-icon';

	let initialState: Todo[] = [
		{ id: '1', text: 'Todo 1', completed: false, editing: false },
		{ id: '2', text: 'Todo 2', completed: false, editing: false },
		{ id: '3', text: 'Todo 3', completed: false, editing: false }
	];

	let todos = $state<Todo[]>(initialState);
	// let editing = $state(false);

	$effect(() => {
		console.log(Array.from(todos));
	});

	function toggleCompleted(id: string): void {
		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
	}

	function addTodo(e: KeyboardEvent): void {
		if (e.key !== 'Enter') return;

		const inputElement = e.target as HTMLInputElement;
		let text = inputElement.value;

		const newTodo: Todo = {
			id: todos.length.toString(),
			text,
			completed: false,
			editing: false
		};

		todos = [...todos, newTodo];
		inputElement.value = '';
	}

	function toggleEditing(id: string): void {
		// todos.map((todo) => {
		// 	if (todo.id === id) {
		// 		return { ...todo, editing: true };
		// 	}
		// 	return todo;
		// });

		let todo = todos.find((todo) => todo.id == id);

		if (todo) {
			todo.editing = !todo.editing;
		}
	}

	function editTodo(id: string, e: KeyboardEvent): void {
		const inputElement = e.target as HTMLInputElement;

		if (e.key === 'Escape') {
			inputElement.blur();
			toggleEditing(id);
		}
		if (e.key !== 'Enter') return;

		const text = inputElement.value;

		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text };
			}
			return todo;
		});

		toggleEditing(id);
	}
</script>

<h1>Todos</h1>

<input class="input-form" type="text" placeholder="Add todo" onkeydown={(e) => addTodo(e)} />

<ul>
	{#each todos as todo}
		<li>
			<input
				class="sr-only"
				aria-label="Toggle todo completed"
				type="checkbox"
				checked={todo.completed}
			/>
			{#if todo.completed}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<iconify-icon icon="mdi:checkbox-marked-outline" onclick={() => toggleCompleted(todo.id)}
				></iconify-icon>
			{:else}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<iconify-icon icon="mdi:checkbox-blank-outline" onclick={() => toggleCompleted(todo.id)}
				></iconify-icon>
			{/if}
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			{#if todo.editing}
				<!-- svelte-ignore a11y-autofocus -->
				<input type="text" autofocus value={todo.text} onkeydown={(e) => editTodo(todo.id, e)} />
			{:else}
				<span ondblclick={() => toggleEditing(todo.id)}>{todo.text}</span>
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
	}

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;

		input,
		span {
			padding-left: 4rem;
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
