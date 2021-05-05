import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../context";

export default function Greeting() {
	const { state: { profile } } = useContext(AppContext);
	return (
		<Container>
			<img src={profile.image} alt=""/>
			<p>{profile.firstname}</p>
		</Container>
	)
}

const Container = styled.div`

`;
