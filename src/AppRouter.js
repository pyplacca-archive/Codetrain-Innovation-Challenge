import { Router } from "@reach/router";
import { PageNotFound, Home, Settings } from "./pages";
import FormGroup from "./components/form/FormGroup";

export default function AppRouter() {
	return (
		<Router>
			<PageNotFound default />
			<Home path="/" />
			<Settings path="/settings" />
		</Router>
	);
}
