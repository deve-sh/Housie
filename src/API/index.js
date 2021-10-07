import auth from "../firebase/authentication";
import db, { firestore } from "../firebase/db";

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
		return callback((await db.collection("games").doc(gameId).get()).data());
	} catch (err) {
		console.log(err);
		return callback(err.message, null);
	}
};
