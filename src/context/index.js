import { createContext, useReducer } from "react";
import { appReducer, initialAppState } from "./reducers/main";

const AppContext = createContext();

const AppProvider = (props) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
