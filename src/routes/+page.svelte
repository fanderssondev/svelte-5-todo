<script lang="ts">
	let initialState: Todo[] = [
		{ id: '1', text: 'Todo 1', completed: false },
		{ id: '2', text: 'Todo 2', completed: false },
		{ id: '3', text: 'Todo 3', completed: false }
	];

	let todos = $state<Todo[]>(initialState);

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

<main>
	<h1>Todos</h1>

	<form>
		<input value="Tesdgsg s gs " type="text" placeholder="Add todo" onkeydown={(e) => addTodo(e)} />

		<button>
			<svg fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</form>

	<ul>
		{#each todos as todo}
			<li>
				<input type="text" value={todo.text} onkeydown={(e) => editTodo(todo.id, e)} />
				<input
					type="checkbox"
					checked={todo.completed}
					onchange={(e) => toggleCompleted(todo.id)}
				/>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		margin-top: 2rem;
	}

	h1 {
		font-size: 4rem;
		letter-spacing: 1.5px;
	}

	form {
		position: relative;
		margin-bottom: 2rem;
		display: flex;
		align-items: center;

		svg {
			height: 2rem;
			margin-left: -60px;
			stroke: var(--gray-600);
			transform: translateY(3px);
		}
	}

	li {
		display: flex;
		align-items: center;

		& input[type='text'] {
			width: 700px;
		}

		& input[type='checkbox'] {
			margin-left: -60px;
			height: 2rem;
		}
	}
</style>
