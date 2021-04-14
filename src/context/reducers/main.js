export const initialAppState = {
	profile: {
		username: "jgraham",
		fullname: "John Graham",
		email: "jgraham@email.com",
		mobile: "+1 23 456 7890",
	},
	preferences: {
		notification: {},
	},
	notifications: [
		// {title: null, eta: null}
	],
	product: null,
	cart: [],
	showModal: {
		checkout: true,
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

		case "preview_product":
			// expects an object as payload
			return {
				...state,
				product: payload
			}

		case "add_to_cart":
			// expects an object as payload
			return {
				...state,
				cart: [...state.cart, payload]
			}

		case "remove_from_cart":
			// expects an id as payload
			console.log(state.cart)
			return {
				...state,
				cart: state.cart.filter(id => id !== payload)
			}

		case "close_modal":
			return {
				...state,
				showModal: {
					...state.showModal,
					[payload]: false
				}
			}

		default: return state;
	}
}
