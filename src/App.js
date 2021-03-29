import AppRouter from "./AppRouter";
import { AppProvider } from "./context";
import ScreensNavigator from './ScreensNavigator';

function App() {
	return (
		<AppProvider>
			<AppRouter />
			<ScreensNavigator/>
		</AppProvider>
	);
}

export default App;
