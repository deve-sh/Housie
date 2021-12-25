# Housie 🏠

A small and fun web-app for playing Housie. 🏠 Built using Svelte and Firebase.

### Setting Up

Clone the repo, create a Firebase project, copy its config.

Create a file called `config.js` in `src/firebase` and paste the config as follows. This is done because Svelte doesn't have a clear working of `process.env` and injected environment variables yet.

```javascript
const firebaseConfig = {
	apiKey: "AIzaS...",
	authDomain: "housie.firebaseapp.com",
	projectId: "housie",
	storageBucket: "housie.appspot.com",
	messagingSenderId: "6205...",
	appId: "1:...",
};

export default firebaseConfig;
```

Run the following commands:

```bash
npm install
npm run dev
```

The app should function as expected.

### Hosting The App

There is a `createFirebaseConfig.js` file that generates firebase config file for you from the environment variables that are available to it. So for services like Vercel, just add your Firebase config as an object string to the environment variables and set the build command to:

```bash
node ./createFirebaseConfig.js && npm run build
```

or

```bash
node ./createFirebaseConfig.js && rollup -c	# Since this project uses Rollup with Svelte
```

### Firestore Security Rules required

Very basic, please feel free to extend.

```
match /games/{gameId} {
    allow create: if isSignedIn();
    allow update: if isSignedIn() &&
        resource.data.createdBy == request.resource.data.createdBy;
    allow get: if isSignedIn();
    allow list: if false;
}
```

Don't forget to allow sign-in from your hosted domains for Firebase Authentication.
