import { useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { AppContext } from "../context";

export default function CheckoutModal() {
	const { state: { showModal }, dispatch } = useContext(AppContext);
	const closeModal = () => {
		dispatch({
			type: "close_modal",
			payload: "checkout"
		})
	}
	console.log({showModal})
	return (
		<ModalContainer className={showModal.checkout ? "show" : "hide"}>
			<div className="modal">
				<button className="modal-close" onClick={closeModal}>
					<span/><span/>
				</button>
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

	.modal {
		transform: translateY(-110%);
		border-radius: 1rem;
		background-color: #fff;
		padding: var(--pad-l);
		width: fit-content;
		margin: 0 auto;

		button.modal-close {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: calc(var(--pad-m) + var(--pad-xs));
			right: calc(var(--pad-m) + var(--pad-xs));
			transition: transform .1s ease-in-out;
			cursor: pointer;

			span {
				height: 2px;
				width: 15px;
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
