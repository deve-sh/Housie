<script>
	import { Button, Icon, TextField } from "svelte-materialify";
	import { mdiMicrosoftXboxControllerBatteryCharging as JoinGameIcon } from "@mdi/js";

	import Modal from "../Modal.svelte";

	import { getGameById } from "../../API";
	import toasts from "../../helpers/toasts";
	import { setState } from "../../store";

	export let toggler = () => null;

	let gameId = "";
	let isFetching = false;

	const joinExistingGame = async () => {
		isFetching = true;
		const gameInfo = await getGameById(gameId);
		isFetching = false;
		if (!gameInfo) return toasts.generateError("Game not found.");

		// Set global state to contain game id.
		setState({ activeGameId: gameId });
	};
</script>

<Modal heading="Join An Existing Game" onClose={toggler}>
	<div style="text-align: center; margin-top: 1rem;">
		<TextField
			type="text"
			required
			disabled={isFetching}
			placeholder="The unique ID that was shared for the game"
			bind:value={gameId}>Game ID</TextField
		>
		<br />
		<Button
			disabled={isFetching}
			block
			size="large"
			class="primary-color"
			on:click={joinExistingGame}
			><Icon path={JoinGameIcon} class="mr-3" /> Join Game</Button
		>
	</div>
</Modal>
