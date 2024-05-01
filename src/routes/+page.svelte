<script lang="ts">
	import 'iconify-icon';
	import { useStorage } from '$lib/stores/useStorage';

	// let initialState: Todo[] = [
	// 	{ id: crypto.randomUUID(), text: 'Todo 1', completed: false, editing: false },
	// 	{ id: crypto.randomUUID(), text: 'Todo 2', completed: false, editing: false },
	// 	{ id: crypto.randomUUID(), text: 'Todo 3', completed: false, editing: false }
	// ];

	// let todos = $state<Todo[]>(initialState);
	let todos = useStorage<Todo[]>('todos', []);

	function toggleCompleted(id: string): void {
		$todos = $todos.map((todo) => {
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
			id: crypto.randomUUID(),
			text,
			completed: false,
			editing: false
		};

		$todos = [...$todos, newTodo];
		inputElement.value = '';
	}

	function toggleEditing(id: string): void {
		const index = $todos.findIndex((todo) => todo.id == id);
		$todos[index].editing = !$todos[index].editing;
	}

	function editTodo(id: string, e: KeyboardEvent): void {
		const inputElement = e.target as HTMLInputElement;
		const index = $todos.findIndex((todo) => todo.id == id);

		if (e.key === 'Escape') {
			$todos[index].editing = false;
			inputElement.blur();
		}
		if (e.key !== 'Enter') return;

		$todos[index].text = inputElement.value;
		$todos[index].editing = false;
	}

	function handleBlur(event: FocusEvent, id: string): void {
		const targetElement = event.target as HTMLInputElement;
		const newText = targetElement.value;

		// editTodo(id, newText);
		targetElement.blur();
		const index = $todos.findIndex((todo) => todo.id == id);
		$todos[index].editing = false;
	}
</script>

<pre>
   {JSON.stringify($todos, null, 2)}
</pre>

<h1>Todos</h1>

<input class="input-form" type="text" placeholder="Add todo" onkeydown={(e) => addTodo(e)} />

<ul>
	{#each $todos as todo}
		<li>
			<input
				class="sr-only"
				aria-label="Toggle todo completed"
				type="checkbox"
				checked={todo.completed}
			/>
			{#if todo.completed}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<iconify-icon icon="mdi:checkbox-marked-outline" onclick={() => toggleCompleted(todo.id)}
				></iconify-icon>
			{:else}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<iconify-icon icon="mdi:checkbox-blank-outline" onclick={() => toggleCompleted(todo.id)}
				></iconify-icon>
			{/if}

			{#if todo.editing}
				<!-- svelte-ignore a11y_autofocus -->
				<input type="text" autofocus value={todo.text} onkeydown={(e) => editTodo(todo.id, e)} />
			{:else}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
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
