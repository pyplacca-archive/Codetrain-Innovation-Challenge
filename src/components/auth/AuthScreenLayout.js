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
	imagePosition,
	artworkContentText,
	showFooter=true,
	footerColor,
	children,
	...props
}) {
	return (
		<ScreenLayout {...{placeImageOnRight, image, imagePos: imagePosition}}>
			<div className="artwork">
				<img src={ image } alt=""/>
				{
					showFooter
					? <Footer alignment={placeImageOnRight ? "left" : "right"} width="100%" color={footerColor}/>
					: null
				}
				{/*<div className="artwork-text">
					{artworkContentText}
				</div>*/}
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

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: ${props => props.imagePos || "center"};
		}

		.artwork-text {
			position: absolute;
			// bottom:
		}
	}

	.form-section {
		flex-basis: 35%;
		height: 100%;
		min-width: 500px;
		display: flex;
		flex-direction: column;
	}
`;
