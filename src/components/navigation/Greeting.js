import { useContext } from "react";
import styled from "styled-components";
import { ProfileAvatar } from "../home";
import { AppContext } from "../../context";

export default function Greeting() {
	const { state: { profile } } = useContext(AppContext);
	return (
		<Container>
			{/*<p>Hello {profile.fullname}</p>*/}
			<ProfileAvatar size="40px" />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	align-items: center;

	> *:first-child {
		margin-right: 1rem;
	}
`;
