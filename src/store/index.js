import { writable } from "svelte/store";

// Get persisted value from local storage.
const storedStore = JSON.parse(
	localStorage.getItem("housie-store") || '{ "user": null }'
);

const store = writable(storedStore);

// Persist changes to local storage.
store.subscribe((value) =>
	localStorage.setItem("housie-store", JSON.stringify(value))
);

export default store;
