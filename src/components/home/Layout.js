import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Location } from '@reach/router';
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Preview from './ProductPreview';
import { AppContext } from "../../context";

export default function Layout({ children, ...props }) {
	const { state: { selectedProduct } } = useContext(AppContext);
	const [showPreview, setShowPreview] = useState(true);

	return (
		<LayoutContainer>
			<Navigation />
			<LayoutBottom>
				<Sidebar />
				<LayoutBottomRight>{children}</LayoutBottomRight>
				<Preview/>
			</LayoutBottom>
		</LayoutContainer>
	);
}

const LayoutContainer = styled.main`
	display: grid;
	grid-template-rows: auto 1fr;
	height: 100vh;
	width: 100vw;
`;

const LayoutBottom = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	overflow-y: hidden;
	width: 100%;
	align-items: flex-start;
`;

const LayoutBottomRight = styled.div`
	padding: var(--pad-l);
	background-color: #f6f6f6;
	margin: 0 var(--pad-l) var(--pad-l) 0;
	border-radius: 20px;
`;
