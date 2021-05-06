import { useState, useContext } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import Search from "./Search";
import { Bell, Cart } from "../Icons";
import { Badge } from "../";
import { NotificationsMenu, Greeting } from "../navigation";
import { AppContext } from "../../context";

export default function Navigation() {
	const { state } = useContext(AppContext);
	const [showNotifications, setShowNotifications] = useState(false);

	const closeNotificationsMenu = () => {
		setShowNotifications(!showNotifications)
	}

	const notificationCount = state.notifications.length;
	const cartCount = state?.cart?.length;

	return (
		<NavigationContainer>
			<h1 className="nav-logo">Artis</h1>
			<NavigationRight>
				<Search />
				<NavItem>
					<Cart onClick={() => navigate("/cart")}/>
					{cartCount ? (
						<Badge style={badgeStyle} value={cartCount} />
					) : null}
				</NavItem>
				<NavItem
					onClick={closeNotificationsMenu}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Bell />
					{notificationCount ? (
						<Badge style={badgeStyle} value={notificationCount}/>
					) : null}
					{showNotifications ? (
						<NotificationsMenu
							style={{
								position: "absolute",
								top: "3rem",
								right: "1.5rem",
							}}
							close={closeNotificationsMenu}
						/>
					) : null}
				</NavItem>
				<NavItem>
					<Greeting/>
				</NavItem>
			</NavigationRight>
		</NavigationContainer>
	);
}

const badgeStyle = {
	position: "absolute",
	top: "0",
	right: "0",
}

function NavItem({ icon, children, ...props }) {
	return <NavItemContainer {...props}>{children}</NavItemContainer>;
}

const NavigationContainer = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: var(--pad-xs) var(--pad-m);
	padding-left: calc(var(--pad-m) * 2 + var(--icon-size));
`;

const NavigationRight = styled.ul`
	display: flex;
	align-items: center;
`;

const NavItemContainer = styled.li`
	position: relative;
	padding: var(--pad-xs) var(--pad-s);
`;
