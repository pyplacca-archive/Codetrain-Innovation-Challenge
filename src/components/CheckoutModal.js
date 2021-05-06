import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";
import Modal from './Modal';
import { BtnRegular } from '../components/Buttons';
import { data as dummyData } from '../utils/dummy';

let processingTimeout;

export default function CheckoutModal() {
	const { state: { showModal, cart, products }, dispatch } = useContext(AppContext);
	const [isProcessing, setIsProcessing] = useState(false);
	const [successful, setSuccessful] = useState(false);

	const closeModal = () => {
		dispatch({
			type: "close_modal",
			payload: "checkout"
		})
		// reset state after automatically closing the modal
		setIsProcessing(false)
		setSuccessful(false)
	}

	const processPayment = () => {
		setIsProcessing(true);
		clearTimeout(processingTimeout);
		processingTimeout = setTimeout(() => {
			dispatch({ type: "clear_cart" })
			// show success message after payment is processed
			setSuccessful(true);
			setTimeout(closeModal, 1500)
		}, 5000)
	}

	const checkoutItems = products.filter(item => cart.includes(item.id));

	return (
		<Modal
			show={showModal.checkout}
			onClose={closeModal}
		>
			<ModalInner>
				{!isProcessing ? (
					<>
						<div className="modal-items">
							{ checkoutItems.map(item => <CheckoutItem {...item} key={item.id}/>) }
						</div>
						<BtnRegular onClick={processPayment}>
							Pay GHC {
								checkoutItems.reduce((total, {price}) => total+price, 0)
							}
						</BtnRegular>
					</>
				) : (
					<>
						{!successful
							? <div className="processing-bar"/>
							: null
						}
						<div className="processing-text">
							{!successful ? (
								<p>Processing payment...</p>
							) : (
								<h3>
									<span>👍</span>
									Payment successful
								</h3>
							)}
						</div>
					</>
				)}
			</ModalInner>
		</Modal>
	)
}

const ModalInner = styled.div`
	max-width: 500px;
	min-width: 300px;

	.modal-items {
		max-height: 600px;
		overflow-y: auto;
		margin-bottom: var(--pad-m);

		> */*:not(:last-child)*/ {
			border-bottom: 1px solid var(--artis-light-grey);
		}
	}

	.processing-bar {
		--w: 300px;
		background-color: var(--artis-light-grey);
		height: 7px;
		width: var(--w);
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		margin-top: 1rem;

		&::after {
			content: "";
			width: 20%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			border-radius: inherit;
			background-color: var(--artis-blue);
			animation: process .75s linear 0s infinite;
		}

		@keyframes process {
			to {
				transform: translateX(calc(var(--w) + 2rem));
			}
		}
	}

	.processing-text {
		text-align: center;
		margin: 1rem 0;

		h3 {
			display: flex;
			flex-direction: column;
			align-items: center;

			span {
				transform: scale(0);
				font-size: 2.5rem;
				margin-bottom: .5rem;
				animation: grow .5s cubic-bezier(0.49,-0.04, 0.27, 1.29) .1s forwards;
			}
		}

		@keyframes grow {
			to {
				transform: scale(1);
			}
		}
	}

	button:last-child {
		width: fit-content;
		align-self: center;
	}
`

function CheckoutItem(details) {
	return (
		<CheckoutItemContainer>
			<img src={details.image} alt="product image"/>
			<div className="item-info">
				<h3 className="item-name">{details.name}</h3>
				<p>{details.description}</p>
			</div>
			<h3 className="item-price">GHC {details.price}</h3>
		</CheckoutItemContainer>
	)
}

const CheckoutItemContainer = styled.div`
	display: flex;
	padding: var(--pad-s) 0;

	img {
		--s: 60px;
		width: var(--s);
		height: var(--s);
		border-radius: .5rem;
		border: 1px solid grey;
		flex-shrink: 0;
	}

	.item-info {
		margin: 0 var(--pad-m);
		overflow: hidden;

		> * {
			margin-bottom: var(--pad-xs);

			&:nth-child(2) {
				text-overflow: ellipsis;
				overflow-x: hidden;
				white-space: nowrap;
			}
		}
	}

	.item-price {
		flex-shrink: 0;
	}
`
