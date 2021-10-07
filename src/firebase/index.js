import firebase from "firebase/app";
import firebaseConfig from "./config";

const firebasePrimaryApp = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.apps[0];

export default firebasePrimaryApp;
