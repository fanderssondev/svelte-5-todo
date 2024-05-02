<script lang="ts">
	import '../app.css';
	import ThemeButton from '$lib/ThemeButton.svelte';

	let darkMode = false;
</script>

<header>
	<div>
		<iconify-icon icon="mdi:checkbox-multiple-marked-circle-outline"></iconify-icon>
		<!-- <h2>Svelte 5 Todo list</h2> -->
		<div class="buttons">
			<button>Login</button>
			<ThemeButton />
		</div>
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
			align-items: center;
			margin: 0 auto;
			padding-inline: 2rem;

			& .buttons {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 2rem;

				& button {
					padding: 0.2em 0.7em;
					border-radius: 5px;
					background-color: hsl(var(--clr-action-700));
					color: hsl(var(--clr-primary-300));
					font-size: 1.5rem;
					letter-spacing: 3px;

					&:hover {
						cursor: pointer;
						background-color: hsl(var(--clr-action-500));
						color: hsl(var(--clr-primary-700));
					}
				}
			}
		}
	}

	iconify-icon {
		font-size: 4rem;
		color: hsl(var(--clr-primary-800));
	}

	main {
		margin-top: 2rem;
		margin-bottom: 4rem;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding-inline: 2rem;
	}
</style>
