import auth, { providers } from "../firebase/authentication";
import db, { firestore } from "../firebase/db";
import drawNRandomNumbers from "../helpers/drawNRandomNumbers";
import drawRandomNumber from "../helpers/drawRandomNumber";

export const loginWithGoogle = async (callback) => {
	try {
		await auth.signInWithPopup(providers.googleProvider);
		return callback(null, auth.currentUser);
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};

export const createHousieGame = async (maxPlayers, callback) => {
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
			lastDrawnAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
		});
		return callback(null, numberDrawn);
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};

export const getGameRef = (gameId) => db.collection("games").doc(gameId);

export const joinGame = async (gameId, callback) => {
	try {
		if (!auth.currentUser)
			return callback("You need to be signed in for joining a game.");

		const batch = db.batch();

		const gameRef = db.collection("games").doc(gameId);
		const gameUserRef = db
			.collection("gameusers")
			.doc(`${gameId}-${auth.currentUser.uid}`);
		const gameData = await getGameById(gameId);

		if (!gameData) return callback("Game not found.");

		if (gameData.createdBy === auth.currentUser.uid)
			return callback(null, gameData); // Simply pass the user to the game page for administration.

		if (gameData.players?.includes(auth.currentUser.uid)) {
			// User already part of the game.
			return callback(null, gameData);
		} else {
			if (gameData.started) return callback("Game has already started.");
			else if (gameData.players?.length >= gameData.maxPlayers)
				return callback("Player capacity reached.");
			// All checks passed. Update
			batch.update(gameRef, {
				players: firestore.FieldValue.arrayUnion(auth.currentUser.uid),
				[`playerInfos.${auth.currentUser.uid}`]:
					firestore.FieldValue.arrayUnion({
						joinedAt: firestore.FieldValue.serverTimestamp(),
						email: auth.currentUser.email,
						name: auth.currentUser.displayName,
					}),
				updatedAt: firestore.FieldValue.serverTimestamp(),
			});
			batch.set(gameUserRef, {
				updatedAt: firestore.FieldValue.serverTimestamp(),
				createdAt: firestore.FieldValue.serverTimestamp(),
				user: auth.currentUser.uid,
				joinedAt: firestore.FieldValue.serverTimestamp(),
				numbersAllocated: drawNRandomNumbers(),
			});
		}

		await batch.commit();

		return callback(null, await getGameById(gameId));
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};

export const getGameUserData = async (gameId, userId, callback) => {
	try {
		const gameUserData = (
			await db.collection("gameusers").doc(`${gameId}-${userId}`).get()
		).data();
		if (callback) return callback(null, gameUserData);
		return gameUserData;
	} catch (err) {
		console.log(err);
		if (callback) return callback(err.message, null);
		return null;
	}
};

export const startGame = async (gameId, callback) => {
	try {
		if (!auth.currentUser)
			return callback("You need to be signed in for updating a game.");

		const gameRef = db.collection("games").doc(gameId);
		const gameData = await getGameById(gameId);

		if (!gameData) return callback("Game not found.");

		if (gameData.createdBy !== auth.currentUser.uid)
			return callback("Unauthorized");

		if (gameData.started) return callback("Game has already started.");

		// All checks passed. Update
		await gameRef.update({
			started: true,
			startedAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
		});

		return callback(null, await getGameById(gameId));
	} catch (err) {
		console.log(err);
		return callback(err.message);
	}
};
