const drawRandomNumber = (alreadyDrawn = [], range = [1, 101]) => {
	let randomNumber = null;
	do {
		randomNumber = Math.floor(Math.random() * range[1]) + range[0];
	} while (alreadyDrawn.includes(randomNumber));
	return randomNumber;
};

export default drawRandomNumber;
