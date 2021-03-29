import styled from 'styled-components';
import { Link } from './components';

export default function ScreensNavigator() {
	return (
		<Container>
			<p>Screens</p>
			<Link to="/settings">Settings</Link>
			<Link to="/signup">Sign up</Link>
			<Link to="/login">Log in</Link>
			<Link to="/">Home</Link>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	opacity: .2;
	transition: opacity .2s ease-in-out;
	padding: .5rem;
	background-color: #000;
	position: fixed;
	top: 0;
	right: 50%;

	> * {
		margin: 0 var(--pad-m);
		color: #fff;

		&:not(:nth-child(1)) {
			display: none;
		}
	}

	&:hover {
		opacity: 1;

		> * {
			display: unset;
			&:nth-child(1) {
				display: none;
			}
		}
	}
`;
