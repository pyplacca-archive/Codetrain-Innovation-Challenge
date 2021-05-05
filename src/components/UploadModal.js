import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";
import Modal from "./Modal";
import { storage, db } from "../firebase";
import * as uuid from "uuid";
import { BtnRegular } from '../components/Buttons';
import { tags } from "../utils/dummy";

export default function UploadModal() {
	const { state: { showModal, profile }, dispatch } = useContext(AppContext);
	const [uploads, setUploads] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [current, setCurrent] = useState(0);
	const [details, setDetails] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	// name: undefined,
	// image: undefined,
	// description: undefined,
	// price: undefined,
	// tags: []
	const [errorText, setErrorText] = useState('');

	const closeModal = () => {
		dispatch({
			type: "close_modal",
			payload: "upload"
		})
	}

	const uploadImages = async () => {
		setIsUploading(true);
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
			// setProducts([
			// 	...products,
			// 	...new Array(files.length).fill()
			// ]);

			setUploads(await getUploadURLs(files))
			setIsUploading(false);
		} catch (err) {
			console.error(err)
			setIsUploading(false)
		}
	}

	const getUploadURLs = async (files) => {
		const fileURLs = uploads || [];
		try {
			for (let fileHandle of files) {
				const file = await fileHandle.getFile();
				// generate an url for image so we can display it
				fileURLs.push({
					file: window.webkitURL.createObjectURL(file),
					type: file.type,
				})
			}
			return fileURLs;
		} catch (err) {
			console.error(err)
		}
	}

	const handleChange = (key) => {
		return ({target: {value}}) => {
			setDetails({
				...details,
				[key]: key === "price" ? +value : value,
			})
		}
	}

	const setTag = (name) => {
		const { tags=new Set() } = details;
		return () => {
			if (!tags.has(name)) {
				tags.add(name);
			} else {
				tags.delete(name);
			}
			setDetails({...details, tags});
		}
	}

	const saveAndContinue = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			// save image to firebase database
			const productId = uuid.v4();
			const { file, type } = uploads[0];
			const f = await fetch(file);
			const blob = await f.blob();
			const filename = `${productId}.${type.split("/")[1]}`
			const imageRef = await storage.child(`products/${filename}`).put(blob);
			console.log("uploaded to database", {imageRef})
			const imageStorageURL = await imageRef.ref.getDownloadURL();
			console.log({imageStorageURL})
			// save upload data to firestore
			const prod = {
				...details,
				tags: [...(details.tags || [])],
				image: imageStorageURL,
				seller: profile,
				id: productId,
			};
			await db.collection('items').doc(productId).set(prod)
			console.log({prod})
			// save uploaded product to state
			dispatch({
				type: "upload_product",
				payload: prod,
			});
			setDetails({})
			// setCurrent(current+1);
			setUploads(uploads.slice(1))
			if (!uploads.length) {
				closeModal()
			}
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			show={showModal.upload}
			onClose={closeModal}
		>
			<ModalInner className="custom-scrollbar">
				<section>
					<h4>Products</h4>
					<div className="uploads">
						{!uploads.length ? (
							<button className="image-upload" onClick={uploadImages}>
								{!isUploading ? "Click to upload" : "Uploading..."}
							</button>
						) : (
							<div className="images-row custom-scrollbar">
								{uploads.map(({file}, i) => (
									<img
										key={i}
										src={file}
										alt="product"
										className={i === current ? "marked" : undefined}
										// onClick={() => setCurrent(i)}
									/>
								))}
							</div>
						)}
					</div>
				</section>
				{uploads.length ? (
					<section className="product-details">
						<h4>Product Details</h4>
						<form onSubmit={saveAndContinue} id="product">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								placeholder="Enter product name"
								value={details.name}
								onChange={handleChange("name")}
							/>
							<label htmlFor="description">Description</label>
							<textarea
								className="custom-scrollbar"
								name="description"
								rows="3"
								placeholder={`Enter ${details.name || "product"}'s description`}
								value={details.description}
								onChange={handleChange("description")}
							/>
							<label htmlFor="price">Price (GHC)</label>
							<input
								type="number"
								name="price"
								step={0.01}
								placeholder={0.00}
								value={details.price}
								onChange={handleChange("price")}
							/>
							<label htmlFor="tags">Tags</label>
							<div className="product-tags">
								{tags.map(tag => (
									<Tag
										selected={details?.tags?.has(tag)}
										onClick={setTag(tag)}
										key={tag}
									>{tag}</Tag>
								))}
							</div>
						</form>
						<BtnRegular form="product">
							{ isLoading ? "Saving..."  : (
								current < uploads.length-1
									? "Save and Continue"
									: "Complete upload"
								)
							}
						</BtnRegular>
					</section>
				) : null}
			</ModalInner>
		</Modal>
	)
}

const ModalInner = styled.div`
	max-height: 680px;
	min-width: 500px;
	overflow-y: auto;
	padding: 0 var(--pad-s);

	section {
		margin-bottom: var(--pad-m);

		&.product-details {
			margin-bottom: 0;

			form {
				width: 100%;

				label {
					margin: var(--pad-s) 0 var(--pad-xs) 0;
					color: var(--safe-grey);
					font-size: .9rem;
					display: block;
				}

				input,
				textarea {
					width: 100%;
					display: block;
					padding: var(--pad-s);
					border: 1px solid #c4c4c4;
					border-radius: .5rem;
					transition: border-color .1s ease-out;
					resize: none;
					font-size: .9rem;

					&:focus {
						border-color: var(--artis-blue)
					}
				}

				.product-tags {
					display: flex;
					flex-wrap: wrap;
					gap: var(--pad-s);
				}
			}

			button {
				margin-top: var(--pad-m);
			}
		}
	}

	h4 {
		margin-bottom: var(--pad-xs);
		padding-bottom: var(--pad-xs);
		display: flex;
		align-items: center;

		&:not(:nth-child(1)) {
			margin-top: var(--pad-s);
		}

		&::after {
			content: "";
			height: 1px;
			background-color: var(--artis-light-grey);
			margin-left: var(--pad-m);
			flex-grow: 1;
		}
	}

	.uploads {
		max-width: 500px;

		button {
			--h: 150px;
			width: max(calc(var(--h) * 2), 100%);
			height: var(--h);
			border: 1px dashed var(--artis-grey);
			// padding: var(--pad-m);
			vertical-align: center;
			border-radius: .5rem;
			text-align: center;

			&:hover {
				border-color: var(--artis-blue)
			}
		}

		.images-row {
			display: inline-flex;
			overflow: auto;
			width: 100%;
			padding: var(--pad-s) 0;

			&::-webkit-scrollbar {
				height: 0px;
				transition: all .1s ease-out;
			}

			&:hover::-webkit-scrollbar {
				height: var(--scrollbar-thickness);
			}

			img {
				width: 100px;
				height: 100px;
				object-fit: cover;
				border-radius: .5rem;
				border: 2px solid transparent;
				transition-property: transform, border-color, filter;
				transition: all .2s ease-out;
				cursor: pointer;
				margin: 0 var(--pad-xs);

				&:not(.marked) {
					filter: grayscale(1);
				}

				&:hover {
					// filter: unset;
				}

				&.marked {
					box-shadow: 0 0 3px #ebebeb;
					border-color: var(--artis-blue);
					transform: scale(1.2);
					margin: 0 var(--pad-s);
				}
			}
		}
	}
`

function Tag ({onClick, selected=false, children}) {
	return (
		<p
			style={{
				borderRadius: "7px",
				padding: "var(--pad-xs)",
				border: `1px solid ${selected ? "transparent" : "var(--artis-blue)"}`,
				backgroundColor: !selected ? "transparent" : "var(--artis-blue)",
				color: !selected ? "unset" : "#fff",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			{children}
		</p>
	)
}
