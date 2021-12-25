const fs = require("fs");

const createFirebaseConfig = () => {
	console.log("Generating Firebase Config File");
	if (process.env.FIREBASE_CONFIG) {
		const fileContents = `const firebaseConfig = ${process.env.FIREBASE_CONFIG};
export default firebaseConfig;`;
		fs.writeFileSync("./src/firebase/config.js", fileContents);
		console.log("Generated Firebase Config File");
	}
};

createFirebaseConfig();
