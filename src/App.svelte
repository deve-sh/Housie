<script>
	import { Button, Icon } from "svelte-materialify";
	import { mdiAccount } from "@mdi/js";

	import Modal from "./components/Modal.svelte";

	import auth from "./firebase/authentication";

	let showLoginModal = false;
	const toggleLoginModal = () => (showLoginModal = !showLoginModal);
</script>

<main class="homepage">
	<img class="homepageimage" src="/images/gameday.svg" alt="Game Day" />
	<h1>Housie 🏠</h1>
	<p>Sit Back, create a game, have fun with friends.</p>
	{#if auth.currentUser}
		<Button size="large" class="secondary-color pl-4">Create A Game</Button>
	{:else}
		<Button
			size="large"
			class="secondary-color pl-4"
			on:click={toggleLoginModal}
			><Icon path={mdiAccount} class="mr-3" /> Login</Button
		>
	{/if}

	{#if showLoginModal}
		<Modal heading="Login To Your Account" onClose={toggleLoginModal} />
	{/if}
</main>

<style>
	.homepage {
		text-align: center;
		max-width: 1100px;
		margin: 0 auto;
		padding: 1rem;
	}
	.homepageimage {
		max-height: 75vh;
		max-width: 350px;
	}

	h1 {
		color: #1976d2;
		margin-top: 2.5rem;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 600;
	}
</style>
