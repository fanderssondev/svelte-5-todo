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
		background-color: var(--clr-primary-600);
		padding-block: 0.5rem;

		& > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 auto;
			padding-inline: 2rem;

			& h2 {
				color: var(--clr-primary-200);
				font-size: 2rem;
				letter-spacing: 2px;
			}

			& .buttons {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 2rem;

				& button {
					padding: 0.2em 0.7em;
					border-radius: 5px;
					background-color: var(--clr-primary-300);
					font-size: 1.5rem;
					letter-spacing: 3px;

					&:hover {
						cursor: pointer;
						background-color: var(--clr-primary-700);
						color: var(--clr-primary-300);
					}
				}
			}
		}
	}

	iconify-icon {
		font-size: 4rem;
		color: var(--clr-primary-200);
	}

	main {
		margin-top: 2rem;
	}

	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding-inline: 2rem;
	}
</style>
