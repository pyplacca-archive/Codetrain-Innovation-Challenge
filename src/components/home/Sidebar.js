import { useState } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Icons } from "../";

export default function Sidebar() {
	const setClass = (route) => {
		return window.location.pathname === route ? "active" : "outlined";
	};

	return (
		<SidebarContainer>
			<SidebarItem
				title="Home"
				icon={<Icons.Home className={setClass("/")} />}
				onClick={() => navigate("/")}
			/>
			<SidebarItem
				title="Profile"
				icon={<Icons.Profile className={setClass("/profile")} />}
			/>
			<SidebarItem
				title="Settings"
				icon={<Icons.Settings className={setClass("/settings")} />}
				onClick={() => navigate("/settings")}
			/>
		</SidebarContainer>
	);
}

function SidebarItem({ icon, title, ...props }) {
	return <SidebarItemContainer {...props}>{icon}</SidebarItemContainer>;
}

const SidebarContainer = styled.ul`
	display: flex;
	flex-direction: column;
	padding: var(--pad-m);
`;

const SidebarItemContainer = styled.li`
	padding: var(--pad-m) 0;
`;
