export const initialAppState = {};

export function appReducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case "upload_photo":
			return {
				...state,
				avatar: payload
			}

		default: return state;
	}
}
