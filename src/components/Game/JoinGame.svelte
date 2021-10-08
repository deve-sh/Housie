<script>
	import { Button, Icon, TextField } from "svelte-materialify";
	import { mdiControllerClassic as GameIcon } from "@mdi/js";

	import Modal from "../Modal.svelte";

	import { getGameById } from "../../API";

	export let toggler = () => null;

	let gameId = "";
	let isFetching = false;

	const joinExistingGame = async () => {
		isFetching = true;
		const gameInfo = await getGameById(gameId);
		isFetching = false;
		console.log(gameInfo);
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
			><Icon path={GameIcon} class="mr-3" /> Join Game</Button
		>
	</div>
</Modal>
