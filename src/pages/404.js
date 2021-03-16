import styled from "styled-components";
import { Footer } from "../components";

export default function PageNotFound({ navigate }) {
	return (
		<PageContainer>
			<h1 className="title">404</h1>
			<p className="sub-text">
				Sorry! The page you're trying to visit doesn't exist
			</p>
			<Footer alignment="center" />
		</PageContainer>
	);
}

const PageContainer = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	.title {
		font-size: 3rem;
		font-weight: 600;
	}

	.sub-text {
		margin-top: 0.5rem;
	}
`;
