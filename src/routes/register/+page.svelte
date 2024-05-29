<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<section>
	<div>
		<h1>Register</h1>

		<form action="?/register" method="POST" use:enhance>
			<div>
				<label for="username">Username</label>
				<input id="username" name="username" type="text" placeholder="Username" required />
			</div>

			<div>
				<label for="password">Password</label>
				<input id="password" name="password" type="password" placeholder="Password" required />
			</div>

			<button type="submit">Register</button>

			{#if form?.invalid}
				<p class="error">Something went wrong</p>
			{/if}

			{#if form?.user}
				<p class="error">Username is taken</p>
			{/if}
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
		letter-spacing: 8px;
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

	.error {
		color: hsl(var(--clr-accent-600));
		letter-spacing: 3px;
		margin-top: 2rem;
		text-align: center;
	}

	button {
		padding: 0.2em 0.7em;
		border-radius: 5px;
		background-color: hsl(var(--clr-action-700));
		color: hsl(var(--clr-primary-300));
		font-size: 1.75rem;
		letter-spacing: 3px;
		margin-top: 1rem;
		width: 100%;

		&:hover {
			cursor: pointer;
			background-color: hsl(var(--clr-action-500));
			color: hsl(var(--clr-primary-700));
		}
	}
</style>
