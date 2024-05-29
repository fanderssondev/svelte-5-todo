<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TodoType } from '$lib/types';
	import 'iconify-icon';

	interface Props {
		todo: TodoType;
		editing: string | null;
		toggleEditing: (id: string, event?: KeyboardEvent) => void;
		handleBlur: (event: FocusEvent, id: string) => void;
	}

	let { todo, editing, toggleEditing, handleBlur }: Props = $props();
</script>

<li class:completed={todo.completed}>
	<form action="?/toggleCompleted" method="post" use:enhance>
		<!-- SECTION toggle completed -->
		<input type="hidden" name="id" value={todo.id} />
		<input type="hidden" name="completed" value={todo.completed} />
		<button aria-label="Toggle todo completed">
			{#if todo.completed}
				<iconify-icon icon="mdi:checkbox-marked-outline"></iconify-icon>
			{:else}
				<iconify-icon icon="mdi:checkbox-blank-outline"></iconify-icon>
			{/if}
		</button>
	</form>

	<form action="?/update" method="post" use:enhance>
		<!-- SECTION edit todo -->
		{#if editing === todo.id}
			<input type="hidden" name="id" value={todo.id} />
			<!-- svelte-ignore a11y_autofocus -->
			<input
				type="text"
				name="text"
				autofocus
				onblur={(e) => handleBlur(e, todo.id)}
				onkeydown={(e) => toggleEditing(todo.id, e)}
				value={todo.text}
			/>
		{:else}
			<!-- SECTION delete todo -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span ondblclick={() => toggleEditing(todo.id)}>{todo.text}</span>
			<input type="hidden" name="id" value={todo.id} />
			<button formaction="?/delete">
				<iconify-icon class="delete-icon" icon="mdi:delete-forever-outline"></iconify-icon>
			</button>
		{/if}
	</form>
</li>

<style>
	li {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
		padding-left: 3em;
		background-color: hsl(var(--clr-primary-300));
		border-radius: 5px;
		min-height: 5em;

		&.completed {
			opacity: 0.4;

			& span {
				text-decoration: line-through;
			}
		}

		&:has(input:focus) {
			outline: 3px solid hsl(var(--clr-primary-700));
		}
	}

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

	iconify-icon {
		position: absolute;
		font-size: 2em;
		left: 0.5em;
		top: 50%;
		transform: translateY(-50%);
	}

	.delete-icon {
		left: auto;
		right: 0.5em;
		opacity: 0.5;

		&:hover {
			opacity: 1;
		}
	}
</style>
