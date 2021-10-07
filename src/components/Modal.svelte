<script>
	import { Overlay, Button, Icon } from "svelte-materialify";
    import { mdiClose } from '@mdi/js';

	export let heading = "";
	export let onClose = () => null;
</script>

<style>
	.modal {
		background: #ffffff;
        min-width: 450px;
        border-radius: 0.75rem;
        overflow: hidden;
	}

    .modal-header {
        display: flex;
        padding: 0.75rem 1rem;
        align-items: center;
        border-bottom: 0.075rem solid #cfcfcf;
        text-align: left;
    }

    .modal-header .heading {
        flex: 9;
        font-size: 1.125rem;
        font-weight: 600;
    }

    .modal-header .cta {
        flex: 1;
        text-align: right;
    }

    .modal-content {
        padding: 1rem;
        text-align: left;
    }
</style>


<Overlay>
	<div class="modal">
		<div class="modal-header">
			<h4 class="heading">{heading}</h4>
            <div class="cta">
                <Button icon class="red-text" on:click={onClose}>
                    <Icon path={mdiClose} />
                  </Button>
            </div>
		</div>
        <div class="modal-content">
            <slot />
        </div>
	</div>
</Overlay>
