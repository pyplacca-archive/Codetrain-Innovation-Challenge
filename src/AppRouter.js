import { useEffect } from "react";
import { Router } from "@reach/router";
import { PageNotFound, Home, Settings, Notifications, Cart } from "./pages";
import { Login, Signup } from './pages/auth';
import { storage } from "./firebase";

export default function AppRouter() {
	// useEffect(() => {
	// 	getAllProducts()
	// }, [])

	// const getAllProducts = () => {
	// 	storage.child("products").listAll().then(res => {
	// 		res.items.forEach(prod => {
	// 			console.log({prod});
	// 			prod.delete()
	// 		})
	// 	})
	// }

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
