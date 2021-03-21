export const initialAppState = {
	profile: {
		username: "jgraham",
		fullname: "John Graham",
		email: "jgraham@email.com",
		mobile: "+1 23 456 7890",
	},
	preferences: {
		notification: {},
	}
};

export function appReducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case "update_profile":
			return {
				...state,
				profile: {
					...state.profile,
					...payload
				}
			}

		case "update_notification_preference":
			return {
				...state,
				preferences: {
					notification: {
						...state.preferences.notification,
						...payload
					}
				}
			}

		default: return state;
	}
}
