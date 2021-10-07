import auth from "../firebase/authentication";
import db, { firestore } from "../firebase/db";
import drawRandomNumber from "../helpers/drawRandomNumber";

export const createHousieGame = (maxPlayers, callback) => {
	try {
		if (!auth.currentUser)
			return callback("You need to be signed in to create a game");

		const gameRef = db.collection("games").doc();

		const gameData = {
			gameId: gameRef.id,
			createdBy: auth.currentUser.uid,
			createdAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
			started: false,
			startedAt: null,
			numbersDrawn: [],
			maxPlayers,
		};

		await gameRef.set(gameData);
		return callback(null, gameData);
	} catch (err) {
		console.log(err);
		return callback(err.message, null);
	}
};

export const getGameById = async (gameId, callback) => {
	try {
		return (await db.collection("games").doc(gameId).get()).data();
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const drawNumber = async (gameId, callback) => {
	try {
		if (!auth.currentUser)
			return callback(
				"You need to be signed in to draw a number for the game."
			);

		const gameRef = db.collection("games").doc(gameId);
		const gameData = await getGameById(gameId);

		if (!gameData) return callback("Game not found.");
		else if (gameData.createdBy !== auth.currentUser.uid)
			return callback("You can't draw a number for this game.");

		const numberDrawn = drawRandomNumber(gameData.numbersDrawn, [1, 101]);
		await gameRef.update({
			numbersDrawn: firestore.FieldValue.arrayUnion(numberDrawn),
			updatedAt: firestore.FieldValue.serverTimestamp(),
		});
		return callback(null);
	} catch (err) {
		console.log(err);
		return null;
	}
};

export const getGameRef = (gameId) => db.collection("games").doc(gameId);
