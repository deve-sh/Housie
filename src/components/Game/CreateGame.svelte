<script>
	import { Button, Icon, TextField } from "svelte-materialify";
	import { mdiControllerClassic as GameIcon } from "@mdi/js";

	import Modal from "../Modal.svelte";

	import { createHousieGame } from "../../API";

	export let toggler = () => null;

	let maxPlayers = 5;
	let isCreating = false;

	const createNewGame = () => {
		isCreating = true;
		createHousieGame(maxPlayers, (err) => {
			isCreating = false;
			if (!err) toggler();
		});
	};
</script>

<Modal heading="Create A New Game" onClose={toggler}>
	<div style="text-align: center; margin-top: 1rem;">
		<TextField
			type="number"
			required
			disabled={isCreating}
			placeholder="Ex: 5"
			bind:value={maxPlayers}
			rules={[(value) => !!Number(value) || "Numeric Value Needed"]}
			>Max No. Of Players</TextField
		>
		<br />
		<Button
			disabled={isCreating}
			block
			size="large"
			class="primary-color"
			on:click={createNewGame}
			><Icon path={GameIcon} class="mr-3" /> Create New Game</Button
		>
	</div>
</Modal>
