import { useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";
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
		<ModalContainer className={showModal.checkout ? "show" : "hide"}>
			<div className="modal">
				<button className="modal-close" onClick={closeModal}>
					<span/><span/>
				</button>
				<div className="modal-items">
					{ checkoutItems.map(item => <ModalItem {...item} key={item.id}/>) }
				</div>
				<BtnRegular>
					Pay GHC {
						checkoutItems.reduce((total, {price}) => total+price, 0)
					}
				</BtnRegular>
			</div>
		</ModalContainer>
	)
}

const ModalContainer = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	background-color: transparent;
	z-index: 5;
	transition-property: background-color, backdrop-filter;
	transition: all .15s ease-out;

	.modal {
		transform: translateY(-110%);
		border-radius: 1rem;
		background-color: #fff;
		padding: var(--pad-l);
		padding-bottom: var(--pad-m);
		width: fit-content;
		margin: 0 auto;
		max-width: 550px;
		display: flex;
		flex-direction: column;
		transition: transform .15s ease-out;

		button.modal-close {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: calc(var(--pad-m) + var(--pad-xs));
			right: calc(var(--pad-m) + var(--pad-xs));
			transition: transform .1s ease-in-out;
			cursor: pointer;
			width: 15px;
			height: 15px;
			background-color: transparent;

			span {
				height: 2px;
				width: 100%;
				background-color: #000;
				position: absolute;
				border-radius: 2px;

				&:nth-child(1) {
					transform: rotate(45deg);
				}

				&:nth-child(2) {
					transform: rotate(-45deg);
				}
			}

			&:hover {
				transform: rotate(90deg);
			}
		}

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
	}

	&.show {
		backdrop-filter: blur(1.5px);
	  background-color: rgba(0,0,0,.5);
		pointer-events: all;

		.modal {
			transform: translateY(var(--pad-l));
		}
	}
`

function ModalItem(details) {
	return (
		<ModalItemContainer>
			<img src={details.image} alt="product image"/>
			<div className="item-info">
				<h3 className="item-name">{details.name}</h3>
				<p>{details.description}</p>
			</div>
			<h3 className="item-price">GHC {details.price}</h3>
		</ModalItemContainer>
	)
}

const ModalItemContainer = styled.div`
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
