import { navigate } from "@reach/router";
import styled from "styled-components";
import * as Buttons from "./Buttons";
import * as Icons from "./Icons";
import Footer from "./Footer";
import Blank from "./Blank";


function Link ({to, children, ...props}) {
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

function Badge({value, color, ...props}) {
	return (
		<BadgeContainer color={color} {...props}>
			{ value > 9 ? '9+' : value }
		</BadgeContainer>
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

const BadgeContainer = styled.span`
	--fsz: .7rem;
	--size: calc(var(--fsz) + 10px);
	font-size: var(--fsz);
	height: var(--size);
	width: var(--size);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	border-radius: 50%;
	background-color: ${props => props.color || "red"};
`;

export {
	Footer,
	Blank,
	Link,
	Buttons,
	Icons,
	Badge,
};
