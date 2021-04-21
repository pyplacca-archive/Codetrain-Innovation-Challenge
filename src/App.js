import AppRouter from "./AppRouter";
import { AppProvider } from "./context";
import ScreensNavigator from "./ScreensNavigator";
import { CheckoutModal, UploadModal } from "./components";

function App() {
	return (
		<AppProvider>
			<AppRouter />
			<CheckoutModal/>
			<UploadModal/>
			{/*<ScreensNavigator/>*/}
		</AppProvider>
	);
}

export default App;
