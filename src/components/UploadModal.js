import { useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";
import Modal from './Modal';
// import { BtnRegular } from '../components/Buttons';

export default function UploadModal() {
	const { state: { showModal }, dispatch } = useContext(AppContext);

	const closeModal = () => {
		dispatch({
			type: "close_modal",
			payload: "upload"
		})
	}

	const uploadImages = async () => {
		try {
			const files = await window.showOpenFilePicker({
				multiple: true,
				excludeAcceptAllOption: true,
				types: [{
					accept: {
						"image/*": [".jpeg", ".jpg", ".png", ".gif"]
					},
					description: "Images"
				}]
			});

			console.log(files)
			// const file = await fileHandle.getFile();
			// // generate an url for image so we can display it
			// const photoURL = window.webkitURL.createObjectURL(file)
			// // save uploaded photo to global state
			// dispatch({
			// 	type: "update_profile",
			// 	payload: {
			// 		avatar: photoURL
			// 	}
			// })
		} catch(err) {
			console.error(err)
		}
	}

	return (
		<Modal
			show={showModal.upload}
			onClose={closeModal}
		>
			<ModalInner>
				<button className="image-upload" onClick={uploadImages}>
					Upload item image(s)
				</button>
			</ModalInner>
		</Modal>
	)
}

const ModalInner = styled.div`
	.image-upload {
		// --s: 150px;
		// width: var(--s);
		// height: var(--s);
		border: 1px dashed var(--artis-grey);
		padding: var(--pad-m);
		border-radius: .5rem;
		text-align: center;

		&:hover {
			border-color: var(--artis-blue)
		}
	}
`
