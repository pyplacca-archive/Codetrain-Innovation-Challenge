import { useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";
import Modal from './Modal';
import { BtnRegular } from '../components/Buttons';
import { data as dummyData } from '../utils/dummy';

export default function CheckoutModal() {
	const { state: { showModal, cart }, dispatch } = useContext(AppContext);
	const closeModal = () => {
		dispatch({
			type: "close_modal",
			payload: "checkout"
		})
	}

	const checkoutItems = dummyData.filter(item => cart.includes(item.id));

	return (
		<Modal
			show={showModal.checkout}
			onClose={closeModal}
		>
			<ModalInner>
				<div className="modal-items">
					{ checkoutItems.map(item => <CheckoutItem {...item} key={item.id}/>) }
				</div>
				<BtnRegular>
					Pay GHC {
						checkoutItems.reduce((total, {price}) => total+price, 0)
					}
				</BtnRegular>
			</ModalInner>
		</Modal>
	)
}

const ModalInner = styled.div`
	max-width: 500px;

	.modal-items {
		max-height: 600px;
		overflow-y: auto;
		margin-bottom: var(--pad-m);

		> */*:not(:last-child)*/ {
			border-bottom: 1px solid var(--artis-light-grey);
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
