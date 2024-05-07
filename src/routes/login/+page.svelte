<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<section>
	<div>
		<h1>Login</h1>

		<form action="?/login" method="POST" use:enhance>
			<div>
				<label for="username">Username</label>
				<input id="username" name="username" type="text" placeholder="Username" required />
			</div>

			<div>
				<label for="password">Password</label>
				<input id="password" name="password" type="password" placeholder="Password" required />
			</div>

			{#if form?.invalid}
				<p class="error">You have entered the wrong credentials</p>
			{/if}

			<button type="submit">Login</button>
		</form>
	</div>
</section>

<style>
	section {
		display: grid;
		place-items: center;
		/* min-height: 100vh; */
	}

	h1 {
		text-align: center;
		font-size: 5rem;
		letter-spacing: 4px;
		margin-block: 3rem;
	}

	form > div {
		display: flex;
		flex-direction: column;
	}

	input {
		margin-bottom: 1rem;
		background-color: hsl(var(--clr-primary-300));
	}

	button {
		padding: 0.2em 0.7em;
		border-radius: 5px;
		background-color: hsl(var(--clr-action-700));
		color: hsl(var(--clr-primary-300));
		font-size: 1.75rem;
		letter-spacing: 3px;

		&:hover {
			cursor: pointer;
			background-color: hsl(var(--clr-action-500));
			color: hsl(var(--clr-primary-700));
		}
	}
</style>
