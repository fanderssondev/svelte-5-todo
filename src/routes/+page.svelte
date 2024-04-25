<script lang="ts">
	let initialState: Todo[] = [
		{ id: '1', text: 'Todo 1', completed: false },
		{ id: '2', text: 'Todo 2', completed: false },
		{ id: '3', text: 'Todo 3', completed: false }
	];

	let todos = $state<Todo[]>([]);

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
			completed: false
		};

		todos = [...todos, newTodo];
		inputElement.value = '';
	}

	function editTodo(id: string, e: KeyboardEvent): void {
		if (e.key !== 'Enter') return;

		const inputElement = e.target as HTMLInputElement;
		const text = inputElement.value;

		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, text };
			}
			return todo;
		});
	}
</script>

<h1>Todos</h1>

<input type="text" placeholder="Add todo" onkeydown={(e) => addTodo(e)} />

<ul>
	{#each todos as todo}
		<li>
			<input type="text" value={todo.text} onkeydown={(e) => editTodo(todo.id, e)} />
			<input type="checkbox" checked={todo.completed} onchange={(e) => toggleCompleted(todo.id)} />
		</li>
	{/each}
</ul>

<style>
</style>
