<script>
	export let numberList = [];
	export let selectedNumbers = [];
	export let onNumberClick = () => null;
</script>

<div class="numbergrid">
	{#each numberList as number}
		<div
			class={`number ${selectedNumbers.includes(number) ? "selected" : ""}`}
			on:click={() => onNumberClick(number)}
		>
			{number}
		</div>
	{/each}
</div>

<style>
	.numbergrid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		/*repeat(auto-fill, minmax(200px, 1fr))*/
		grid-gap: 1rem;
		margin-top: 1.5rem;
		overflow-x: auto;
	}

	.numbergrid .number {
		padding: 1.5rem;
		border: 0.1rem solid #2883dd;
		font-size: 1.5rem;
		font-weight: 500;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	@media only screen and (max-width: 768px) {
		.numbergrid {
			grid-gap: 0.5rem;
		}
		.numbergrid .number {
			padding: 0.75rem;
			font-size: 1.125rem;
		}
	}

	.numbergrid .number.selected {
		color: #ffffff;
		background-color: #2883dd;
	}
</style>
