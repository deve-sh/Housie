import { toast } from "@zerodevx/svelte-toast";

const successOptions = {
	theme: {
		"--toastBackground": "#48BB78",
		"--toastBarBackground": "#2F855A",
	},
};

const errorOptions = {
	theme: {
		"--toastBackground": "#F56565",
		"--toastBarBackground": "#C53030",
	},
};

const warningOptions = {
	theme: {
		"--toastBackground": "#bdbf2b",
		"--toastBarBackground": "#83850f",
	},
};

const generateSuccess = (message) => toast.push(message, successOptions);
const generateWarning = (message) => toast.push(message, warningOptions);
const generateError = (message) => toast.push(message, errorOptions);

const toasts = {
	generateSuccess,
	generateError,
	generateWarning,
};

export default toasts;
