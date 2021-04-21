// third-party
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';
// components
import Layout from '../components/home/Layout';
import { Card } from '../components/home';
// others
import { AppContext } from '../context';
import { db } from "../firebase";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    console.log({products: state.products});
  }, [state.products])

  useEffect(() => {
    // get products from firestore
    if (!state.products.length) {
      db.collection("products").get().then(query => {
        dispatch({
          type: "populate_products",
          payload: [...query.docs.map(doc => doc.data())]
        })
      })
    }
  }, [])

  return (
    <Layout>
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
    </Layout>
  );
}

const ProductsGrid = styled.div`
  grid-gap: var(--pad-l);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
  justify-items: center;
`;
