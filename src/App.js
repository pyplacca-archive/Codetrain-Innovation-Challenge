import AppRouter from "./AppRouter";
import { AppProvider } from "./context";

function App() {
	return (
		<AppProvider>
			<AppRouter />
		</AppProvider>
	);
}

export default App;
