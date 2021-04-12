import { useContext } from "react";
import styled from "styled-components";
import Layout from '../components/home/Layout';
import { Card } from '../components/home';
import { Blank } from "../components";
import { AppContext } from "../context";
import { data as dummyData } from '../utils/dummy';

export default function CartScreen() {
	const {state: { cart } } = useContext(AppContext);
	console.log(cart)
	return (
		<Layout>
			<CartContainer>
				<h1>Cart</h1>
				{
					!cart.length ? (
						<Blank>You have no items in your cart</Blank>
					) : (
						<ProductsGrid>
							{dummyData
								.filter(({id}) => cart.includes(id))
								.map(item => <Card {...item}/>)
							}
						</ProductsGrid>
					)
				}
			</CartContainer>
		</Layout>
	)
}

const CartContainer = styled.div`
	h1 {
		margin-bottom: 1.5rem;
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

