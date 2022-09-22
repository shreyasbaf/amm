import { INITIALBUST, INITIALRUST } from "./actiontype";

export const initialRust = (data: any) => {
	return {
		type: INITIALRUST,
		payload: data,
	};
};
export const initialTokenB = (data: any) => {
	return {
		type: INITIALBUST,
        payload: data
	};
};
