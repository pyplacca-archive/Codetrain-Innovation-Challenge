// import { useContext } from 'react';
import styled from 'styled-components';
import { BtnRegular } from '../Buttons';
// import { AppContext } from '../../context';

export default function Preview({show, product, ...props}) {
	// const { state: { selectedProduct: product } } = useContext(AppContext);

	return (
		<PreviewContainer {...{show, ...props}}>
			<div className="preview-container-inner">
				<img src={product?.image} alt=""/>
				<h2 className='preview--product-name'>{ product?.name }</h2>
				<h4 className='preview--product-price'>GHC { product?.price?.toFixed(2) }</h4>
				<p className="preview--title">Description</p>
				<p>{ product?.description }</p>
				<p className="preview--title">Seller</p>
				{/* seller info goes here */}
				<p className="preview--title">Tags</p>
				<p>{ product?.tags?.join(', ') }</p>
				<div className="buttons">
					<BtnRegular style={{backgroundColor: "green"}}>Buy now</BtnRegular>
					<BtnRegular>Add to cart</BtnRegular>
				</div>
			</div>
		</PreviewContainer>
	)
}

const PreviewContainer = styled.article`
	padding: ${props => props.show ? "var(--pad-s)" : "0px"};
	// margin-bottom: ${props => props.show ? "var(--pad-l)" : "0px"};
	margin-bottom: var(--pad-l);
	// margin-right: ${props => props.show ? "var(--pad-l)" : "0px"};
	margin-right: var(--pad-l);
	overflow: hidden;
	width: ${props => props.show ? "350px" : "0px"};
	height: 100%;
	// width: 0px;
	transition-property: width;
	transition: all ease-in-out .25s;
	overflow-y: hidden;

	.preview-container-inner {
		// display: flex;
		// flex-direction: column;
		overflow-y: auto;
		// flex-grow: 1;
		// min-height: 800px;

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

		.buttons {
			margin-top: auto;
			width: 100%;
			display: grid;
			grid-template-colums: 1fr 1fr;
			row-gap: var(--pad-m);
		}
	}
`;
