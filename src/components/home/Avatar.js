import { useState } from "react";
import styled from "styled-components";
import { Camera } from "../Icons";
import avi from "../../assets/avatar.png";

export default function ProfileAvatar (props) {
	/*
		props
			size: dimension of the avatar
			editable: when this prop is set to true, photo upload is enabled
	*/
	const [photo, setPhoto] = useState(avi);

	const uploadPhoto = () => {
		window.showOpenFilePicker({})
			.then(fileObject => {
				const file = fileObject.getFile;
				// const photoUrl = window.webkitURL.createObjectURL(file)
				console.log({fileObject, file})
			})
			.catch(err => {
				console.log({err})
			})
	}

	return (
		<AvatarContainer {...props}>
			{ props.editable ? (
				<button onClick={uploadPhoto}>
					<Camera size="1.2rem" color="#fff"/>
				</button>
			) : null}
			<img src={photo} alt=""/>
		</AvatarContainer>
	)
}

const AvatarContainer = styled.div`
	--size: ${props => props.size || "100px"};
	height: var(--size);
	width: var(--size);
	border-radius: 50%;
	position: relative;

	img,
	button {
		width: inherit;
		height: inherit;
		border-radius: inherit;
	}

	img {
		object-fit: cover;
	}

	button {
		opacity: 0;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		backdrop-filter: blur(1.5px);
		pointer-events: none;
		transition-property: backdrop-filter, opacity;
		transition: all .2s ease-in-out;
		cursor: pointer;

		.app-icon:hover {
			fill: #fff;
		}
	}

	&:hover {
		button {
			pointer-events: all;
			opacity: ${props => props.editable ? "1" : "0"};
		}
	}
`;
