import { writable } from "svelte/store";

// Get persisted value from local storage.
const storedStore = JSON.parse(
	localStorage.getItem("housie-store") || '{ "user": null, "activeGameId": null }'
);

const store = writable(storedStore);

// Persist changes to local storage.
store.subscribe((value) =>
	localStorage.setItem("housie-store", JSON.stringify(value))
);

export const setState = (updates = {}) =>
	store.update((oldState) => ({ ...oldState, ...updates }));

export default store;
