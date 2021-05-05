import { useEffect } from "react";
import { Router } from "@reach/router";
import {
	PageNotFound,
	Home,
	Settings,
	Notifications,
	Cart,
	MyProducts
} from "./pages";
import { Login, Signup, ProfileSetup } from './pages/auth';
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
			<Login path="/login"/>
			<Signup path="/signup"/>
			<ProfileSetup path="/profile-setup"/>
			<Home path="/" />
			<Settings path="/settings" />
			<Notifications path="/notifications"/>
			<Cart path="/cart"/>
			<MyProducts path="/my-products"/>
		</Router>
	);
}
