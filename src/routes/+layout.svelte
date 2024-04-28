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
			<ThemeButton />
		</div>
	</div>
</header>

<div class="container">
	<slot />
</div>

<style>
	header {
		background-color: var(--gray-600);
		/* padding-block: 0.5rem; */

		& > div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 auto;
			padding-inline: 2rem;

			& h2 {
				color: var(--gray-200);
				font-size: 2rem;
				letter-spacing: 2px;
			}

			& .buttons {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 1rem;

				& button {
					padding: 0.2em 0.7em;
					border-radius: 5px;
					background-color: var(--gray-300);
					font-size: 1.5rem;
					letter-spacing: 3px;

					&:hover {
						cursor: pointer;
						background-color: var(--gray-700);
						color: var(--gray-300);
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
