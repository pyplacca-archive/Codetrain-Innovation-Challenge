import styled from "styled-components";

export default function Blank({ children, ...props }) {
	return <BlankContainer {...props}>{children}</BlankContainer>;
}

const BlankContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
