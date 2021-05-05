export const initialAppState = {
	profile: {
		username: "Kd",
		fullname: "Kayla's dad",
		email: "kd@email.com",
		mobile: "+233 24 456 7890",
		location: "Accra",
		image: null,
	},
	preferences: {
		notification: {},
	},
	notifications: [
		// {title: null, eta: null}
	],
	product: null,
	products: [],
	cart: [],
	showModal: {
		checkout: false,
		upload: false,
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
				cart: [...state.cart, ...(
					!state.cart.includes(payload)
						? [payload]
						: []
				)]
			}

		case "remove_from_cart":
			// expects an id as payload
			return {
				...state,
				cart: state.cart.filter(id => id !== payload)
			}

		case "open_modal":
			return {
				...state,
				showModal: {
					...state.showModal,
					[payload]: true
				}
			}

		case "close_modal":
			return {
				...state,
				showModal: {
					...state.showModal,
					[payload]: false
				}
			}

		case "populate_products":
			return {
				...state,
				products: payload
			}

		case "upload_product":
			return {
				...state,
				products: [...state.products, payload]
			}

		case "delete_product":
			return {
				...state,
				products: state.products.filter(({id}) => id !== payload)
			}

		default: return state;
	}
}
