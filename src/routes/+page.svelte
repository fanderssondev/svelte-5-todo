<script lang="ts">
	let initialState: Todo[] = [
		{ id: '1', text: 'Todo 1', completed: false },
		{ id: '2', text: 'Todo 2', completed: false },
		{ id: '3', text: 'Todo 3', completed: false }
	];

	let todos = $state<Todo[]>(initialState);

	$effect(() => {
		console.log(todos);
	});

	function handleCompleted(id: string): void {
		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
	}
</script>

<h1>Todos</h1>

<ul>
	{#each todos as todo}
		<li>
			<input type="text" name="" id="" value={todo.text} />
			<input
				type="checkbox"
				name=""
				id=""
				bind:checked={todo.completed}
				onchange={() => (todo.completed = !todo.completed)}
			/>
		</li>
	{/each}
</ul>

<style>
</style>
