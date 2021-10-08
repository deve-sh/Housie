<script>
	import { Button, Icon } from "svelte-materialify";
	import { mdiGoogle } from "@mdi/js";

	import Modal from "./Modal.svelte";

	import { loginWithGoogle } from "../API";
	import toasts from "../helpers/toasts";

	export let toggler = () => null;

	let isLoggingIn = false;

	const loginUser = () => {
		isLoggingIn = true;
		loginWithGoogle((err) => {
			isLoggingIn = false;
			if (err) return toasts.generateError(err);
			toggler();
		});
	};
</script>

<Modal heading="Login To Your Account" onClose={toggler}>
	<div style="text-align: center">
		<Button
			disabled={isLoggingIn}
			block
			outlined
			size="large"
			on:click={loginUser}
			><Icon path={mdiGoogle} class="mr-3" /> Login With Google</Button
		>
	</div>
</Modal>
