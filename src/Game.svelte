<script>
	import { onDestroy, onMount } from "svelte";
	import { ProgressCircular, Button, Icon } from "svelte-materialify";
	import { mdiExitToApp as ExitIcon } from "@mdi/js";

	import NumberGrid from "./components/Game/NumberGrid.svelte";

	import getHundredNumbers from "./helpers/getHundredNumbers";
	import { getGameRef, getGameUserData } from "./API";
	import state, { setState } from "./store";
	import auth from "./firebase/authentication";

	export let gameId;
	export let playerInfo;

	let gameData;
	let gameUserData;
	let gameLoading = true;

	let realtimeListener = null;

	onMount(() => {
		if (gameId && playerInfo) {
			realtimeListener = getGameRef(gameId).onSnapshot((doc) => {
				gameLoading = false;
				gameData = doc.data();

				if (gameData?.createdBy !== auth.currentUser.uid) {
					// User is player. Need to fetch additional data about user's allocated numbers.
					getGameUserData(gameId, auth.currentUser.uid, (error, data) => {
						if (error) {
							toasts.generateError(error);
							exitGame();
						}
						gameUserData = data;
					});
				}
			});
		}
	});

	onDestroy(() => {
		if (realtimeListener && typeof realtimeListener === "function")
			realtimeListener(); // Unsubscribe device from realtime updates for game.
	});

	const exitGame = () => {
		setState({ activeGameId: null });
	};
</script>

<main id="game-container" class="game-page">
	{#if gameLoading || !gameData}
		<ProgressCircular indeterminate color="success" class="mb-4" />
		<br />
		Please wait, your game is loading.
	{:else}
		<!-- Common Block -->
		<div class="game-common">
			<div class="text-right">
				<Button class="red white-text" onClick={exitGame}
					><Icon class="mr-3" path={ExitIcon} /> Exit Game</Button
				>
			</div>
		</div>
		{#if gameData?.createdBy === $state?.user?.uid}
			<!-- Admin Block -->
			<NumberGrid
				numberList={getHundredNumbers()}
				selectedNumbers={gameData?.numbersDrawn || []}
			/>
		{:else}
			<!-- Player Block -->
			<NumberGrid
				numberList={gameUserData?.numbersAllocated || []}
				selectedNumbers={gameData?.numbersDrawn || []}
			/>
		{/if}
	{/if}
</main>

<style type="text/css">
</style>
