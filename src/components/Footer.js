import styled from "styled-components";
import { navigate } from "@reach/router";

export default function Footer({ alignment = "left" }) {
	// can either align items in the footer to the left, center or right
	const alignmentOptions = {
		left: "flex-start",
		center: "center",
		right: "flex-end",
	};
	const alignItems = alignmentOptions[alignment];

	return (
		<FooterContainer {...{ alignItems }}>
			<div className="footer-content">
				<FooterLink text="About" href="/about" />
				<FooterLink text="Help" href="/help" />
				<FooterLink text="FAQ" href="/faq" />
				<FooterLink text="Guidelines" href="/guidelines" />
			</div>
		</FooterContainer>
	);
}

const FooterContainer = styled.div`
	position: absolute;
	bottom: 0;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: ${(props) => props.alignItems};

	.footer-content {
		padding: 0.5rem;
		display: flex;
		align-items: center;
	}
`;

function FooterLink({ text, href }) {
	return (
		<FooterLinkContainer tabIndex={0} onClick={() => navigate(href)}>
			{text}
		</FooterLinkContainer>
	);
}

const FooterLinkContainer = styled.a`
	color: grey;
	text-decoration: none;
	padding: 1em 1.5em;
	font-size: 0.9rem;
	font-weight: 300;
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`;
