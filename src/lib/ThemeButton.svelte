<script lang="ts">
	import { browser } from '$app/environment';
	import { darkMode } from '$lib/stores/useTheme';

	// let darkMode = useTheme

	$effect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			$darkMode = true;
		}
	});

	function handleDarkModeToggle(): void {
		$darkMode = !$darkMode;
	}

	$effect(() => {
		if (browser) {
			$darkMode ? (document.body.dataset.theme = 'dark') : (document.body.dataset.theme = '');
		}
	});
</script>

<button
	id="theme-btn"
	aria-label={darkMode ? 'Light theme' : 'Dark theme'}
	onclick={handleDarkModeToggle}
	><svg class:dark={darkMode} class:light={!darkMode} viewBox="0 0 300 300" fill="none">
		<circle id="moon" cx="150" cy="148" r="65" />
		<path
			id="sun"
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M150.247 7L193.964 50H250V105.117L292.833 147.247L250 190.794V250H191.766L152.586 289.833L112.089 250H50V188.93L10 149.586L50 108.919V50H107.952L150.247 7ZM150 232C194.183 232 230 195.287 230 150C230 104.713 194.183 68 150 68C105.817 68 70 104.713 70 150C70 195.287 105.817 232 150 232Z"
		/>
	</svg>
</button>

<style>
	#theme-btn {
		display: inline;
		cursor: pointer;
		background: 0;
		border: 0;
		opacity: 0.8;
		padding: 0.5rem;
		border-radius: 50%;
		position: relative;
		isolation: isolate;
		line-height: 0;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			background: hsl(0 0% 50% / 0.2);
			border-radius: inherit;
			transform: scale(0);
			opacity: 0;
			z-index: -1;
		}

		:global([data-theme='dark']) &::before {
			animation: pulseToLight 650ms ease-out;
		}

		:global([data-theme='light']) &::before {
			animation: pulseToDark 650ms ease-out;
		}

		&::after {
			content: attr(aria-label);
			position: absolute;
			color: hsl(var(--clr-primary-700));
			background-color: hsl(var(--clr-primary-300));
			width: max-content;
			font-size: 1rem;
			line-height: initial;
			letter-spacing: 2.5px;
			right: -20px;
			top: 110%;
			margin: 0 auto;
			padding: 0.1em 0.25em 0 0.25em;
			border-radius: 0.2em;
			opacity: 0;
			transform: scale(1);
			transform-origin: top;
			transition:
				transform 0ms linear 100ms,
				opacity 100ms linear;
		}

		&:hover,
		&:focus-visible {
			opacity: 1;
			background: hsla(var(--clr-primary-600) / 0.1);
		}

		&:hover::after,
		&:focus-visible::after {
			opacity: 0.7;
			transform: scale(1);
			transition:
				transform 70ms linear,
				opacity 70ms linear;
		}
	}

	svg {
		--size: 2rem;

		fill: hsl(var(--clr-primary-800));
		width: var(--size);
		height: var(--size);
		cursor: pointer;
		border: 0;
		border-radius: 50%;
		position: relative;

		& #moon {
			transition: transform 500ms ease-out;
		}

		& #sun {
			transform-origin: center center;
			transition: transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32);
		}

		&.light #moon {
			transform: translateX(-13%);
		}

		&.light #sun {
			transform: rotate(0.5turn);
		}

		&.dark #moon {
			transform: translateX(0);
		}
	}

	@keyframes pulseToLight {
		0% {
			transform: scale(0);
			opacity: 0.5;
		}
		10% {
			transform: scale(1);
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1);
		}
	}

	@keyframes pulseToDark {
		0% {
			transform: scale(0);
			opacity: 0.5;
		}
		10% {
			transform: scale(1);
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1);
		}
	}
</style>
