import AppRouter from "./AppRouter";
import { AppProvider } from "./context";
import ScreensNavigator from "./ScreensNavigator";
import { CheckoutModal } from "./components";

function App() {
	return (
		<AppProvider>
			<AppRouter />
			<CheckoutModal/>
			<ScreensNavigator/>
		</AppProvider>
	);
}

export default App;
