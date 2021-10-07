const drawRandomNumber = (alreadyDrawn = [], range = [0, 100]) => {
	let randomNumber = null;
	do {
		$rand = Math.floor(Math.random() * range[1]) + range[0];
	} while (alreadyDrawn.includes(randomNumber));
	return randomNumber;
};

export default drawRandomNumber;
