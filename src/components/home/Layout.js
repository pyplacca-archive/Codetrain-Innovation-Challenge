import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

export default function Layout({ children }) {
	return (
		<LayoutContainer>
			<Navigation />
			<LayoutBottom>
				<Sidebar />
				<LayoutBottomRight>{children}</LayoutBottomRight>
			</LayoutBottom>
		</LayoutContainer>
	);
}

const LayoutContainer = styled.main`
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const LayoutBottom = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	overflow-y: auto;
`;

const LayoutBottomRight = styled.div`
	padding: var(--pad-s);
	background-color: #f6f6f6;
	margin: 0 var(--pad-l) var(--pad-l) 0;
	border-radius: 20px;
`;
