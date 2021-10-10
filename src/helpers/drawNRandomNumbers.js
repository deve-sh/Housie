const drawNRandomNumbers = (n = 25) => {
	const numbers = Array(100)
		.fill()
		.map((_, index) => index + 1);
	numbers.sort(() => Math.random() - 0.5);
	return numbers.slice(0, n);
};

export default drawNRandomNumbers;

/* Elegant Solution courtsey of: https://stackoverflow.com/a/51924696/10145649 */
