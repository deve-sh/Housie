<script>
	import { Button, Icon } from "svelte-materialify";
	import { mdiAccount, mdiControllerClassic as GameIcon } from "@mdi/js";

	import auth from "./firebase/authentication";

	import Authentication from "./components/Authentication.svelte";
	import CreateGameModal from "./components/Game/CreateGame.svelte";

	let showLoginModal = false;
	const toggleLoginModal = () => (showLoginModal = !showLoginModal);

	let showGameCreatorModal = false;
	const toggleGameCreatorModal = () =>
		(showGameCreatorModal = !showGameCreatorModal);

	let isLoggedIn = auth.currentUser;

	auth.onAuthStateChanged((user) => {
		isLoggedIn = !!user;
	});
</script>

<main class="homepage">
	<img class="homepageimage" src="/images/gameday.svg" alt="Game Day" />
	<h1>Housie 🏠</h1>
	<p>Sit Back, create a game, have fun with friends.</p>
	{#if isLoggedIn}
		<Button
			size="large"
			class="secondary-color pl-4"
			on:click={toggleGameCreatorModal}
		>
			<Icon path={GameIcon} class="mr-3" /> Create A Game</Button
		>
	{:else}
		<Button
			size="large"
			class="secondary-color pl-4"
			on:click={toggleLoginModal}
			><Icon path={mdiAccount} class="mr-3" /> Login</Button
		>
	{/if}

	{#if !isLoggedIn && showLoginModal}
		<Authentication toggler={toggleLoginModal} />
	{/if}

	{#if isLoggedIn && showGameCreatorModal}
		<CreateGameModal toggler={toggleGameCreatorModal} />
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
