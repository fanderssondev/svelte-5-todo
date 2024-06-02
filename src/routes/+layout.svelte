<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import '../app.css';
	import 'iconify-icon';
	import DarkModeButton from '$lib/components/DarkModeButton.svelte';
</script>

<svelte:head>
	<title>Svelte 5 Todos</title>
</svelte:head>

<header>
	<div>
		<a href="/"><iconify-icon icon="mdi:checkbox-multiple-marked-circle-outline"></iconify-icon></a>
		{#if $page.data.user}
			<h3>Welcome {$page.data.user.name}</h3>
		{/if}
		<nav class="links">
			{#if !$page.data.user}
				<a class="register" href="/register">Register</a>
				<a class="link" href="/login">Login</a>
			{/if}

			{#if $page.data.user}
				<form action="/logout" method="post" use:enhance>
					<button type="submit">Log out</button>
				</form>
			{/if}
		</nav>
		<DarkModeButton />
	</div>
</header>

<main>
	<div class="container">
		<slot />
	</div>
</main>

<style>
	header {
		background-color: hsl(var(--clr-primary-300));
		padding-block: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 1;

		& > div {
			display: flex;
			justify-content: space-between;
			gap: 1rem;
			align-items: center;
			margin: 0 auto;
			padding-inline: 2rem;

			& > a {
				flex: 1;
			}
		}

		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 2rem;

			& a,
			& button {
				padding: 0.2em 0.7em;
				border-radius: 5px;
				background-color: hsl(var(--clr-action-700));
				color: hsl(var(--clr-primary-300));
				font-size: 1.5rem;
				letter-spacing: 3px;
				text-decoration: none;

				&.register {
					background-color: hsl(var(--clr-accent-600));
				}

				&:hover {
					cursor: pointer;
					background-color: hsl(var(--clr-action-500));
					color: hsl(var(--clr-primary-700));
				}
			}
		}
	}

	iconify-icon {
		font-size: 4rem;
		color: hsl(var(--clr-primary-700));
	}

	main {
		margin-top: 2rem;
		margin-bottom: 4rem;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding-inline: 1rem;
	}
</style>
