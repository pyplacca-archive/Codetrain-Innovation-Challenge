import { useContext } from "react";
import styled from "styled-components";
import Layout from '../components/home/Layout';
import { Blank } from "../components";
import { AppContext } from "../context";

export default function NotificationsScreen() {
	const { state: {notifications}} = useContext(AppContext);

	return (
		<Layout>
			<NotificationsContainer>
				<h2>Notifications</h2>
				{
					!notifications.length ? (
						<Blank>You have no notifications</Blank>
					) : (
						// display notifications here
						null
					)
				}
			</NotificationsContainer>
		</Layout>
	)
}

const NotificationsContainer = styled.div`
	h2 {
		margin-bottom: 1.5rem;
	}
`;
