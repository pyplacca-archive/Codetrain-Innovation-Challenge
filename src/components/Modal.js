import { useState } from "react";
import styled from "styled-components";

export default function Modal({show=false, children, onClose, ...props}) {
	return (
		<ModalContainer
			className={show ? "show" : "hide"}
			{...props}
		>
			<div className="modal">
				<button className="modal-close" onClick={onClose}>
					<span/><span/>
				</button>
				{ children }
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
		display: flex;
		flex-direction: column;
		transition: transform .15s ease-out;

		button.modal-close {
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: var(--pad-m);
			right: var(--pad-m);
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
