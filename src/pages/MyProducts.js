import { useContext } from "react";
import styled from "styled-components";
import Layout from "../components/home/Layout";
import { Card } from "../components/home";
import { Blank } from "../components";
import { AppContext } from "../context";
import { data as dummyData } from "../utils/dummy";
import { db } from "../firebase";

export default function CartScreen() {
  const {
    state: { products, profile },
    dispatch,
  } = useContext(AppContext);

  const deleteProduct = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        return () => {
          dispatch({
            type: "delete_product",
            payload: id,
          });
        };
      });
  };

  const showUploadModal = () => {
    dispatch({
      type: "open_modal",
      payload: "upload",
    });
  };

  return (
    <Layout>
      <CartContainer>
        <div>
          <h1>My Products</h1>
          <button onClick={showUploadModal}>Upload item</button>
        </div>
        {!products.length ? (
          <Blank>You have not uploaded any items yet</Blank>
        ) : (
          <ProductsGrid>
            {products
              .filter(({ seller }) => profile.email === seller.email)
              .map((item) => (
                <CartItem key={item.id}>
                  <Card {...item} />
                  <button onClick={deleteProduct(item.id)}>Delete</button>
                </CartItem>
              ))}
          </ProductsGrid>
        )}
      </CartContainer>
    </Layout>
  );
}

const CartContainer = styled.div`
  > *:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    button {
      padding: var(--pad-m);
      background-color: var(--artis-blue);
      color: #fff;
      border-radius: 0.5rem;
      transition: transform 0.1s ease-in-out;

      &:active {
        transform: scale(0.97);
      }
    }
  }
`;

const ProductsGrid = styled.div`
  grid-gap: var(--pad-l);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--card-width), 1fr));
  justify-items: center;
`;

const CartItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;

  > *:nth-child(1) {
    transition: filter 0.15s ease-in-out;
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
    transition: transform 0.15s ease-in-out;
  }

  &:hover {
    > *:nth-child(1) {
      filter: blur(1.15px);
    }

    button {
      transform: translateY(0);
    }
  }
`;
