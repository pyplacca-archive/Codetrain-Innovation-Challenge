import { useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import { Bell, Cart } from "../Icons";
import { NotificationsMenu } from "../navigation";

export default function Navigation() {
	const [showNotifications, setShowNotifications] = useState(false);
	return (
		<NavigationContainer>
			<h1 className="nav-logo">Artis</h1>
			<NavigationRight>
				{/*<Search />*/}
				<NavItem>
					<Cart />
				</NavItem>
				<NavItem
					onClick={() => setShowNotifications(!showNotifications)}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Bell />
					{showNotifications ? (
						<NotificationsMenu
							style={{
								position: "absolute",
								top: "3rem",
								right: 0,
							}}
						/>
					) : null}
				</NavItem>
			</NavigationRight>
		</NavigationContainer>
	);
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
