<script lang="ts">
	import { enhance } from '$app/forms';

	import type { TodoType, Filter } from '$lib/types';

	import FilterSection from '$lib/components/FilterSection.svelte';
	import Todo from '$lib/components/Todo.svelte';

	interface DataProps {
		data: {
			todos: TodoType[];
			user: {
				id: string;
				name: string;
			};
		};
	}

	let { data }: DataProps = $props();

	let activeFilter: Filter = $state('all');

	let filteredTodos = $derived<TodoType[]>(filterTodos(data.todos, activeFilter));
	let unfinished = $derived(data.todos.filter((todo) => !todo.completed).length);

	let editing = $state<string | null>(null);

	function filterTodos(todos: TodoType[], newFilter: Filter): TodoType[] {
		switch (newFilter) {
			case 'all':
				return [...todos];
			case 'unfinished':
				return todos.filter((todos) => !todos.completed);
			case 'finished':
				return todos.filter((todos) => todos.completed);
		}
	}

	function setFilter(newFilter: Filter) {
		activeFilter = newFilter;
	}

	function toggleEditing(id: string, event?: KeyboardEvent): void {
		if (event && event.key === 'Escape') {
			editing = null;
			return;
		}

		if (!event) {
			if (!editing) {
				editing = id;
			} else {
				editing = null;
			}
		}
	}

	function handleBlur(event: FocusEvent, id: string): void {
		const targetElement = event.target as HTMLInputElement;

		editing = null;
		targetElement.blur();
	}
</script>

<h1>Todos</h1>

<form action="?/create" method="post" use:enhance>
	<!-- svelte-ignore a11y_autofocus -->
	<input class="input-form" type="text" name="text" autofocus placeholder="Add todo" />
</form>

<FilterSection {unfinished} {activeFilter} {setFilter} />

<ul>
	{#each filteredTodos as todo (todo.id)}
		<Todo {todo} {editing} {toggleEditing} {handleBlur} />
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
</style>
