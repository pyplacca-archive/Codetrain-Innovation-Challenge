import { Router } from "@reach/router";
import { PageNotFound, Home, Settings, Notifications, Cart } from "./pages";
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
			<Cart path="/cart"/>
		</Router>
	);
}
