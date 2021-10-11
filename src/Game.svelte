<script>
	import { onDestroy, onMount } from "svelte";
	import { ProgressCircular, Button, Icon, Switch } from "svelte-materialify";
	import {
		mdiExitToApp as ExitIcon,
		mdiDice5 as DrawNumberIcon,
		mdiPlay as StartGameIcon,
	} from "@mdi/js";

	import NumberGrid from "./components/Game/NumberGrid.svelte";

	import getHundredNumbers from "./helpers/getHundredNumbers";
	import { drawNumber, getGameRef, getGameUserData, startGame } from "./API";
	import state, { setState } from "./store";
	import auth from "./firebase/authentication";

	export let gameId;
	export let playerInfo;

	let gameData;
	let gameUserData;
	let gameLoading = true;
	let drawnNumber = "N/A";
	let isNumberDrawing = false;

	// Player-specific state
	let autoPunchDrawnNumbers = false;
	let punchedNumbers = [];
	const toggleAutoPunch = () =>
		(autoPunchDrawnNumbers = !autoPunchDrawnNumbers);
	const onPlayerNumberClick = (number) => {
		const numberIndex = punchedNumbers.indexOf(number);
		if (numberIndex !== -1) punchedNumbers.splice(numberIndex, 1);
		else punchedNumbers.push(number);
	};
	// End of player-specific state

	let realtimeListener = null;

	const exitGame = () => {
		setState({ activeGameId: null });
	};

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

	const drawGameNumber = () => {
		isNumberDrawing = true;
		drawNumber(gameId, (error, number) => {
			isNumberDrawing = false;
			if (error) return toasts.generateError(error);
			drawnNumber = number;
		});
	};

	const startCurrentGame = () => {
		startGame(gameId, (error) => {
			if (error) return toasts.generateError(error);
		});
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
				<Button class="red white-text" on:click={exitGame}
					><Icon class="mr-3" path={ExitIcon} /> Exit Game</Button
				>
			</div>
		</div>
		{#if gameData?.createdBy === $state?.user?.uid}
			<!-- Admin Block -->
			{#if !gameData?.started}
				<Button class="green white-text" on:click={startCurrentGame}
					><Icon class="mr-3" path={StartGameIcon} /> Start Game</Button
				>
			{:else}
				<div class="drawnnumber">
					{#if isNumberDrawing}
						<ProgressCircular />
					{:else}
						{drawnNumber}
					{/if}
				</div>
				<Button
					class="black white-text"
					disabled={isNumberDrawing}
					on:click={drawGameNumber}
					><Icon class="mr-3" path={DrawNumberIcon} /> Draw Number</Button
				>
			{/if}
			<br />
			<NumberGrid
				numberList={getHundredNumbers()}
				selectedNumbers={gameData?.numbersDrawn || []}
			/>
		{:else}
			<!-- Player Block -->
			<div style="text-align: center; margin-bottom: 1.5rem;">
				<Switch checked={autoPunchDrawnNumbers} on:click={toggleAutoPunch}
					>Auto-Punch Numbers</Switch
				>
			</div>
			<NumberGrid
				numberList={gameUserData?.numbersAllocated || []}
				selectedNumbers={autoPunchDrawnNumbers
					? gameData?.numbersDrawn || []
					: punchedNumbers}
				onNumberClick={onPlayerNumberClick}
			/>
		{/if}
	{/if}
</main>

<style type="text/css">
	.drawnnumber {
		border: 0.075rem solid black;
		border-radius: 0.5rem;
		padding: 1rem;
		min-width: 6.5rem;
		max-width: 10.5rem;
		margin: 1.5rem auto;
		font-size: 2.5rem;
		font-weight: 500;
	}
</style>
