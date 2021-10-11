# Housie 🏠

A small and fun web-app for playing Housie. 🏠 Built using Svelte and Firebase.

### Setting Up

Clone the repo, create a Firebase project, copy its config.

Create a file called `config.js` in `src/firebase` and paste the config as follows.

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
