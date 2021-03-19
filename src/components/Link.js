import { navigate } from "@reach/router";
import styled from "styled-components";

export default function Link ({to, children, ...props}) {
	return (
		<LinkContainer
			onClick={() => navigate(to)}
			tabIndex={0}
			{...props}
		>
			{children}
		</LinkContainer>
	)
}

const LinkContainer = styled.span`
	color: var(--artis-blue);
	cursor: pointer;

	&:focus,
	&:hover {
		text-decoration: underline;
	}
`;
