import { useContext } from "react";
import styled from "styled-components";
import Layout from '../components/home/Layout';
import { Card } from '../components/home';
import { Blank } from "../components";
import { AppContext } from "../context";
import { data as dummyData } from '../utils/dummy';

export default function CartScreen() {
	const {state: { cart }, dispatch } = useContext(AppContext);

	const removeFromCart = (itemId) => {
		return () => {
			dispatch({
				type: "remove_from_cart",
				payload: itemId,
			})
		}
	}

	const proceedToPayment = () => {
		dispatch({
			type: "open_modal",
			payload: "checkout"
		})
	}

	return (
		<Layout>
			<CartContainer>
				<div>
					<h1>Cart</h1>
					{cart.length ? <button onClick={proceedToPayment}>Proceed to payment</button> : null}
				</div>
				{
					!cart.length ? (
						<Blank>You have no items in your cart</Blank>
					) : (
						<ProductsGrid>
							{dummyData
								.filter(({id}) => cart.includes(id))
								.map(item => (
									<CartItem key={item.id}>
										<Card {...item}/>
										<button onClick={removeFromCart(item.id)}>
											Remove
										</button>
									</CartItem>
								))
							}
						</ProductsGrid>
					)
				}
			</CartContainer>
		</Layout>
	)
}

const CartContainer = styled.div`
	> *:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;

		button {
			padding: var(--pad-m);
			background-color: green;
			color: #fff;
			border-radius: .5rem;
			transition: transform .1s ease-in-out;

			&:active {
				transform: scale(.97);
			}
		}
	}
`;

const ProductsGrid = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	gap: var(--pad-m);
	// display: grid;
	// grid-template-columns: repeat(auto-fit, minmmax());
`;

const CartItem = styled.div`
	position: relative;
	overflow: hidden;
	border-radius: 1rem;

	> *:nth-child(1) {
		transition: filter .15s ease-in-out;
	}

	button {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: var(--artis-red);
		color: #fff;
		padding: var(--pad-m) 0;
		text-align: center;
		transform: translateY(101%);
		transition: transform .15s ease-in-out;
	}

	&:hover {
		> *:nth-child(1) {
			filter: blur(1.15px);
		}

		button {
			transform: translateY(0)
		}
	}
`
