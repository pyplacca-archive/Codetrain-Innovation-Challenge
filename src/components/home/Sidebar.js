import { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Icons } from "../";
import ProfileMenu from "../sidebar/Profile";

export default function Sidebar() {
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const setClass = (route) => {
		return window.location.pathname === route ? "active" : "outlined";
	};

	return (
		<SidebarContainer>
			<div className="apart">
				<SidebarItem title="Home" onClick={() => navigate("/")}>
					<Icons.Home className={setClass("/")} />
				</SidebarItem>
				<SidebarItem title="Profile">
					<Icons.Profile
						className={setClass("/profile")}
						onClick={() => setShowProfileMenu(!showProfileMenu)}
					/>
					{ showProfileMenu ? (
						<ProfileMenu
							style={{
								position: "absolute",
								top: "calc(var(--pad-m) * -1)",
								left: "calc(100% + var(--pad-m))",
								zIndex: 10,
								backgroundColor: "#fff",
							}}
						/>
					) : null}
				</SidebarItem>
			</div>
			<SidebarItem title="Settings" onClick={() => navigate("/settings")}>
				<Icons.Settings className={setClass("/settings")} />
			</SidebarItem>
		</SidebarContainer>
	);
}

function SidebarItem({ children, title, ...props }) {
	return <SidebarItemContainer {...props}>{children}</SidebarItemContainer>;
}

const SidebarContainer = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: var(--pad-m);
	padding-bottom: calc(var(--pad-l) + var(--pad-m));
`;

const SidebarItemContainer = styled.li`
	padding: var(--pad-m) 0;
	position: relative;
`;
