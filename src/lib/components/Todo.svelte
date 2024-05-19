<script lang="ts">
	import { enhance } from '$app/forms';
	import 'iconify-icon';

	interface Props {
		todo: Todo;
		editing: string | null;
		toggleEditing: (id: string) => void;
	}

	let { todo, editing, toggleEditing }: Props = $props();
</script>

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

<form action="?/update" method="post">
	{#if editing === todo.id}
		<!-- SECTION edit todo -->
		<input type="hidden" name="id" value={todo.id} />
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="text"
			name="text"
			autofocus
			onblur={() => toggleEditing(todo.id)}
			value={todo.text}
		/>
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span ondblclick={() => toggleEditing(todo.id)}>{todo.text}</span>
		<!-- <form action="?/delete" method="post" use:enhance> -->
		<!-- SECTION delete todo -->
		<input type="hidden" name="id" value={todo.id} />
		<button formaction="?/delete">
			<iconify-icon class="delete-icon" icon="mdi:delete-forever-outline"></iconify-icon>
		</button>
	{/if}
</form>

<style>
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
		display: inline-block;
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

	/* &:has(input:focus) {
			outline: 3px solid hsl(var(--clr-primary-700));
	} */
</style>
