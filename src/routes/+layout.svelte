<script lang="ts">
	import '../app.css';
	import Logo from '$lib/logos/Logo.svelte';
	import ThemeButton from '$lib/ThemeButton.svelte';

	let darkMode = false;
</script>

<header>
	<div>
		<Logo --size="2rem" />
		<h2>Svelte 5 Todo list</h2>
		<div class="buttons">
			<button>Login</button>
			<!-- <ThemeButton /> -->
		</div>
	</div>
</header>

<div class="container">
	<slot />
</div>

<style>
	header {
		background-color: hsl(var(--gray-500));
		padding-block: 0.5rem;

		& > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 auto;
			padding-inline: 2rem;

			& .buttons {
				display: flex;
				gap: 1rem;

				& button {
					padding: 0.2rem 0.5rem;
					border-radius: 5px;

					&:hover {
						cursor: pointer;
						background: #000;
					}
				}
			}
		}
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding-inline: 2rem;
	}
</style>
