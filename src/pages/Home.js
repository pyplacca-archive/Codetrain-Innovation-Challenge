// third-party
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
// components
import Layout from '../components/home/Layout';
import { Card } from '../components/home';
import { Blank } from '../components';
// others
import { AppContext } from '../context';
import { db } from "../firebase";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log({products: state.products});
    if (state.products.length) {
      setIsLoading(false);
    }
  }, [state.products])

  useEffect(() => {
    // get products from firestore
    if (!state.products.length) {
      db.collection("items").get().then(query => {
        dispatch({
          type: "populate_products",
          payload: [...query.docs.map(doc => doc.data())]
        })
      })
      .finally(() => setIsLoading(false))
    }
  }, [])

  return (
    <Layout>
      {!isLoading ? (
        <ProductsGrid>
          {state.products.map(info => (
            <Card
              {...info}
              selected={selectedCard === info.id}
              onClick={() => setSelectedCard(prev => {
                const selection = prev !== info.id ? info : null;
                dispatch({
                  type: 'preview_product',
                  payload: selection
                })
                return selection?.id;
              })}
              key={info.id}
            />
          ))}
        </ProductsGrid>
      ) : (
        <Blank>Fetching products...</Blank>
      )}
    </Layout>
  );
}

export const ProductsGrid = styled.div`
  grid-gap: var(--pad-l);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
  justify-items: center;
`;
