import { Router } from "@reach/router";
import { PageNotFound, Home, Settings, Notifications } from "./pages";
import { Login, Signup } from './pages/auth';

export default function AppRouter() {
	return (
		<Router>
			<PageNotFound default />
			<Signup path="/signup"/>
			<Login path="/login"/>
			<Home path="/" />
			<Settings path="/settings" />
			<Notifications path="/notifications"/>
		</Router>
	);
}
