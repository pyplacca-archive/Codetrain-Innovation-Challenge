import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import navigate from "@reach/router";
import { ProfileAvatar } from "../home";
import { AppContext } from "../../context";
import { OutsideAlerter } from "../";

export default function ProfileMenu(props) {
	const { state: { profile } } = useContext(AppContext);

	return (
		<OutsideAlerter closeFn={props.close}>
			<ProfileMenuContainer {...props}>
				<ProfileAvatar size="150px"/>
				<div className="details">
					<p>{profile.fullname}</p>
					<p>{profile.email}</p>
					<p>{profile.mobile}</p>
				</div>
				<button className="sign-out">Sign out</button>
			</ProfileMenuContainer>
		</OutsideAlerter>
	)
}

const slideRightFadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ProfileMenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	border-radius: 1rem;
	width: 235px;
	box-shadow: 0 0px 12px var(--artis-grey);
	cursor: default;
	opacity: 0;
	transform: translateX(-1.5rem);
	animation: ${slideRightFadeIn} 0.25s ease-out 0s forwards;

	.avatar {
		margin: var(--pad-m);
	}

	.details {
		margin: var(--pad-m);
		margin-top: 0;

		p {
			max-width: 24ch;
			color: var(--artis-grey);
			margin: var(--pad-s) 0;
			text-align: center;
			font-size: 1rem;

			&:nth-child(1) {
				font-size: 1.2rem;
				font-weight: 500;
				color: #000
			}
		}
	}

	.sign-out {
		padding: var(--pad-m);
		background-color: red /*var(--artis-grey)*/;
		opacity: .8;
		color: #fff;
		width: 100%;
		cursor: pointer;
		transition: opacity .15s ease-in-out;

		&:hover {
			opacity: 1;
		}
	}
`;
