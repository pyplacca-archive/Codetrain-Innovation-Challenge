import styled, { keyframes } from "styled-components";
import { navigate } from "@reach/router";
import Blank from "../Blank";
import { Settings } from "../Icons";

export default function NotificationsMenu({ ...props }) {
	return (
		<MenuContainer {...props}>
			<h4 className="menu-title">Notifications</h4>
			<ul className="notification-list">
				{/* <Blank
					style={{
						color: "var(--safe-grey)",
						fontWeight: "300",
						fontSize: ".9em",
						minHeight: "100px",
					}}
				>
					You've got no notifications
				</Blank> */}
				<Notification title="Artis app under development" eta="Now" />
				<Notification title="Test notification" eta="1 hour ago" />
			</ul>
			<div className="notifications-footer">
				<span>
					<Settings onClick={() => navigate("/settings")} size="1.2rem"/>
				</span>
				<p>All notifications</p>
			</div>
		</MenuContainer>
	);
}

function Notification({ title, eta, ...props }) {
	return (
		<NotificationContainer className="notification">
			<div className="notification-inner">
				<p className="notification-title">{title}</p>
				<p className="notification-eta">{eta}</p>
			</div>
		</NotificationContainer>
	);
}

const slideDownFadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MenuContainer = styled.div`
	width: clamp(220px, 50vw, 360px);
	background-color: #fff;
	border-radius: 0.5rem;
	box-shadow: 0px 0px 9px var(--shadow-color);
	overflow: hidden;
	opacity: 0;
	transform: translateY(-1.5rem);
	animation: ${slideDownFadeIn} 0.25s ease-out 0s forwards;

	.menu-title {
		border-bottom: 1px solid #f0f0f0;
		color: #fff;
		background-color: var(--artis-blue);
		padding: var(--pad-s);
	}

	.notification:not(:last-child) {
		.notification-inner {
			border-bottom: 1px solid var(--border-color);
		}
	}

	.notifications-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid var(--border-color);
		padding: var(--pad-s);
		cursor: default;

		> * {
			font-size: 0.8rem;
			cursor: pointer;

			&:last-child {
				color: var(--artis-blue);
			}
		}
	}
`;

const NotificationContainer = styled.li`
	padding: 0 var(--pad-s);

	&:hover,
	&:active {
		background-color: #f6f6f6;
	}

	.notification-inner {
		padding: var(--pad-s) var(--pad-xs);

		.notification-title {
			font-size: 0.8rem;
			font-weight: 300;
		}

		.notification-eta {
			color: var(--safe-grey);
			font-weight: 300;
			margin-left: auto;
			width: fit-content;
			font-size: 0.9em;
		}
	}
`;
