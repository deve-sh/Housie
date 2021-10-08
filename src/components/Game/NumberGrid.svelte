<script>
	export let numberList = [];
	export let selectedNumbers = [];
</script>

<div class="numbergrid">
	{#each numberList as number}
		<div class={`number ${selectedNumbers.includes(number) ? "selected" : ""}`}>
			{number}
		</div>
	{/each}
</div>

<style>
	.numbergrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.numbergrid .number {
		padding: 1.5rem;
		border: 0.1rem solid #2883dd;
		font-size: 1.5rem;
		font-weight: 500;
		border-radius: 0.5rem;
	}

	.numbergrid .number.selected {
		color: #ffffff;
		background-color: #2883dd;
	}
</style>
