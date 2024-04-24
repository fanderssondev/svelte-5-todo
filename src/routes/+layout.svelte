<script lang="ts">
	import '../app.css';
	import Logo from '$lib/logos/Logo.svelte';
	import ThemeButton from '$lib/ThemeButton.svelte';

	let darkMode = false;

	let logoSize = '100px';
	let color1 = '#333333';
	let color2 = '#333333';
</script>

<header>
	<Logo --size={logoSize} --color1="--rose-400" />
	<h2>Svelte 5 Todo list</h2>
	<button>Login</button>
	<ThemeButton />
</header>

<slot />

<style>
</style>
