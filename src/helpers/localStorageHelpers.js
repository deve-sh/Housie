const saveGameInformation = (
	gameId = "",
	playerInfo = {},
	numbersAssigned = []
) => {
	localStorage.setItem(
		"gameInfo",
		JSON.stringify({
			gameId,
			playerInfo,
			numbersAssigned,
		})
	);
	return true;
};

const getGameInformation = () => {
	const gameInfo = localStorage.getItem("gameInfo");
	return gameInfo ? JSON.parse(gameInfo) : null;
};

const clearGameInformation = () => localStorage.clear();
