import { useState, useContext } from "react";
import styled from "styled-components";
import { Camera } from "../Icons";
import { AppContext } from "../../context";
import avi from "../../assets/avatar.png";

export default function ProfileAvatar (props) {
	/*
		props
			size: dimension of the avatar
			editable: when this prop is set to true, photo upload is enabled
	*/
	const {state, dispatch} = useContext(AppContext);

	const uploadPhoto = async () => {
		try {
			const [fileHandle] = await window.showOpenFilePicker({
				multiple: false,
				excludeAcceptAllOption: true,
				types: [{
					accept: {
						"image/*": [".jpeg", ".jpg", ".png", ".gif"]
					},
					description: "Images"
				}]
			});
			const file = await fileHandle.getFile();
			// generate an url for image so we can display it
			const photoURL = window.webkitURL.createObjectURL(file)
			// save uploaded photo to global state
			dispatch({
				type: "upload_photo",
				payload: photoURL
			})
		} catch(err) {
			console.error(err)
		}
	}

	return (
		<AvatarContainer {...props}>
			{ props.editable ? (
				<button onClick={uploadPhoto} title="Upload photo">
					<Camera size="1.2rem" color="#fff"/>
				</button>
			) : null}
			<img src={state.avatar || avi} alt=""/>
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
		backdrop-filter: blur(1.5px) grayscale(.3);
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
