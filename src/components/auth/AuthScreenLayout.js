import styled from "styled-components";
import { Footer } from "../";

/*
	Component props
	- placeImageOnRight: specified whether to place image on the "left" or "right" of the screen
	- image: the image to be displayed
	- showFooter: whether to display the footer component or not
	- children: the form
*/
export default function AuthScreenLayout ({
	image,
	placeImageOnRight=false,
	showFooter=true,
	children,
	...props
}) {
	return (
		<ScreenLayout {...{placeImageOnRight}}>
			<div className="artwork">
				{ image }
				{
					showFooter
					? <Footer alignment={placeImageOnRight ? "left" : "right"} width="100%"/>
					: null
				}
			</div>
			<div className="form-section">
				{ children }
			</div>
		</ScreenLayout>
	)
}

const ScreenLayout = styled.main`
	display: flex;
	flex-direction: ${props => props.placeImageOnRight ? "row-reverse" : "row" };
	height: 100vh;

	.artwork {
		flex-grow: 1;
		position: relative;
		background-color: #f0f0f0;
	}

	.form-section {
		flex-basis: 35%;
		min-width: 500px;
	}
`;
