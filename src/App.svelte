<script>
	import { SvelteToast } from "@zerodevx/svelte-toast";
	import { Button, Icon } from "svelte-materialify";
	import {
		mdiAccount as LoginIcon,
		mdiControllerClassic as GameIcon,
		mdiMicrosoftXboxControllerBatteryCharging as JoinGameIcon,
		mdiExitToApp as LogoutIcon,
	} from "@mdi/js";

	import auth from "./firebase/authentication";
	import store, { setState } from "./store";

	import Authentication from "./components/Authentication.svelte";
	import CreateGameModal from "./components/Game/CreateGame.svelte";
	import JoinGameModal from "./components/Game/JoinGame.svelte";

	import Game from "./Game.svelte";

	let showLoginModal = false;
	const toggleLoginModal = () => (showLoginModal = !showLoginModal);

	let showGameCreatorModal = false;
	const toggleGameCreatorModal = () =>
		(showGameCreatorModal = !showGameCreatorModal);

	let showGameJoinerModal = false;
	const toggleGameJoinerModal = () =>
		(showGameJoinerModal = !showGameJoinerModal);

	let isLoggedIn = $store.user || auth.currentUser;

	auth.onAuthStateChanged((user) => {
		isLoggedIn = !!user;
		let userInfo = null;

		if (user) {
			userInfo = {
				displayName: user.displayName,
				phoneNumber: user.phoneNumber,
				email: user.email,
				uid: user.uid,
				id: user.uid,
				providerData: JSON.parse(JSON.stringify(user.providerData)),
				lastSignInTime: user.metadata.lastSignInTime,
				photoURL: user.photoURL,
				isAnonymous: user.isAnonymous,
			};
		}

		setState({ user: userInfo });
	});

	const signUserOut = async () => {
		await auth.signOut();
	};
</script>

<SvelteToast />
<main class="homepage">
	{#if !isLoggedIn || !$store.activeGameId}
		<img class="homepageimage" src="/images/gameday.svg" alt="Game Day" />
		<h1>Housie 🏠</h1>
		<p>
			Sit Back, create a game or join one, have fun with friends and family.
		</p>
		{#if isLoggedIn}
			<Button
				size="large"
				class="secondary-color pl-4"
				on:click={toggleGameCreatorModal}
			>
				<Icon path={GameIcon} class="mr-3" /> Create A Game</Button
			>
			<Button
				size="large"
				class="ml-2 black white-text"
				on:click={toggleGameJoinerModal}
			>
				<Icon path={JoinGameIcon} class="mr-3" /> Join A Game</Button
			>
			<br />
			<Button size="large" depressed class="mt-4 white" on:click={signUserOut}>
				<Icon path={LogoutIcon} class="mr-3" /> Logout</Button
			>
		{:else}
			<Button
				size="large"
				class="secondary-color pl-4"
				on:click={toggleLoginModal}
				><Icon path={LoginIcon} class="mr-3" /> Login</Button
			>
		{/if}

		{#if !isLoggedIn && showLoginModal}
			<Authentication toggler={toggleLoginModal} />
		{/if}

		{#if isLoggedIn && showGameCreatorModal}
			<CreateGameModal toggler={toggleGameCreatorModal} />
		{/if}

		{#if isLoggedIn && showGameJoinerModal}
			<JoinGameModal toggler={toggleGameJoinerModal} />
		{/if}
	{:else}
		<Game gameId={$store.activeGameId} playerInfo={$store.user} />
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
