<script>
	import { onDestroy, onMount } from "svelte";

	import { getGameRef } from "./API";
	import * as localStorageHelpers from "./helpers/localStorageHelpers";

	export let gameId;
	export let playerInfo;

	let gameData;
	let gameLoading = true;
	let numbersAssigned = [];

	let realtimeListener = null;

	onMount(() => {
		if (gameId && playerInfo) {
			realtimeListener = getGameRef(gameId).onSnapshot((doc) => {
				gameLoading = false;
				gameData = doc.data();
				localStorageHelpers.saveGameInformation(
					gameData.gameId,
					playerInfo,
					numbersAssigned
				);
			});
		}
	});

	onDestroy(() => {
		if (realtimeListener && typeof realtimeListener === "function")
			realtimeListener(); // Unsubscribe device from realtime updates for game.
	});
</script>

<main id="game-container" class="game-page" />

<style type="text/css">
</style>
