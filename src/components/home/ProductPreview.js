import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BtnRegular } from '../Buttons';
import { AppContext } from '../../context';

export default function Preview() {
	const { state: { product }, dispatch } = useContext(AppContext);
	const [showPreview, setShowPreview] = useState(false);

	useEffect(() => {
		setShowPreview(product && window.location.pathname === "/");
	}, [product])

	const addToCart = () => {
		dispatch({
			type: "add_to_cart",
			payload: product.id,
		})
	}

	// const closePreview = () => {
	// 	setShowPreview(false);
	// }

	return showPreview ? (
		<PreviewContainer>
			<div className="preview-container-inner">
				<img src={product?.image} alt=""/>
				<h2 className='preview--product-name'>{ product?.name }</h2>
				<h4 className='preview--product-price'>
					GHC { product?.price?.toFixed(2) }
				</h4>
				<p className="preview--title">Description</p>
				<p>{ product?.description || "No description provided by seller"}</p>
				<p className="preview--title">Seller</p>
				{/* seller info goes here */}
				<div className="preview--seller">
					<div className="seller-details">
						<p>{ product?.seller?.fullname || "Anonymous"}</p>
						<p>{ product?.seller?.mobile || "Uknown"}</p>
					</div>
				</div>
				<p className="preview--title">Tags</p>
				<p>{ product?.tags?.join(', ') || "No related tags founds" }</p>
				<div className="buttons">
					<BtnRegular style={{backgroundColor: "green"}}>
						Buy now
					</BtnRegular>
					<BtnRegular onClick={addToCart}>
						Add to cart
					</BtnRegular>
				</div>
			</div>
		</PreviewContainer>
	) : null
}

const PreviewContainer = styled.article`
	// padding: ${props => props.show ? "var(--pad-s)" : "0px"};
	padding: var(--pad-s);
	// margin-bottom: ${props => props.show ? "var(--pad-l)" : "0px"};
	margin-bottom: var(--pad-l);
	// margin-right: ${props => props.show ? "var(--pad-l)" : "0px"};
	margin-right: var(--pad-l);
	overflow: hidden;
	// width: ${props => props.show ? "350px" : "0px"};
	width: 350px;
	height: 100%;
	// width: 0px;
	transition-property: width;
	transition: all ease-in-out .25s;
	overflow-y: hidden;

	.preview-container-inner {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		// flex-grow: 1;
		height: 100%;

		img {
			width: 100%;
			height: 150px;
			border: 1px solid #000;
			object-fit: cover;
			border-radius: .5rem;
		}

		.preview--title {
			color: var(--artis-grey);
			margin: var(--pad-m) 0 var(--pad-s) 0;

			& + p:not(.product-preview--title) {
				// margin-top: var(--pad-s);
			}
		}

		.preview--product-name,
		.preview--product-price {
			margin: .5rem 0;
		}

		.preview--seller {
			display: flex;
			align-items: center;

			img {
				margin-right: var(--pad-m);
				border-radius: 50%;
				border: 1px solid grey;
				width: 70px;
				height: 70px;
				object-fit: cover;
			}

			.seller-details {

			}
		}

		.buttons {
			margin-top: auto;
			width: 100%;
			display: grid;
			grid-template-colums: 1fr 1fr;
			row-gap: var(--pad-m);
			margin-top: auto;
		}
	}
`;
