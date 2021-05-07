import React, { Suspense } from 'react';
import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { createCheckoutSession } from "next-stripe/client";

import { CartProvider, useCart } from "react-use-cart";
import { Text } from 'drei';

function PageCustom() {
    const { addItem } = useCart();
  
    const products = [
      {
        id: 1,
        name: "Malm",
        price: 9900,
        quantity: 1
      },
      {
        id: 2,
        name: "Nordli",
        price: 16500,
        quantity: 5
      },
      {
        id: 3,
        name: "Kullen",
        price: 4500,
        quantity: 1
      },
    ];
  
    return (
      <group>
        {products.map((p, i) => (
          <mesh key={p.id} position={[ i * 1.5 - 1, -1, 0 ]} onClick={() => addItem(p)}>
            <boxBufferGeometry args={[1,1,1]} />
            <meshBasicMaterial color='red' />
          </mesh>
        ))}
      </group>
    );
  }
  
  function Cart() {
    const {
      isEmpty,
      totalUniqueItems,
      items,
      updateItemQuantity,
      removeItem,
    } = useCart();
  
    console.log(items)
  
    if (isEmpty) return <p>Your cart is empty</p>;
  
    return (
      <>
  
        <group position={[0,2,0]}>
          {items.map((item,i) => (
            <>
            <group position={[0,i,0]}>
              {/* <Text position={[0,1,0]} fontSize={ 1.0 }>
                {item.quantity} x {item.name} &mdash;
              </Text> */}
              <mesh key={item.id} position={[i,0,0]} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                <boxBufferGeometry args={[1,1,1]} />
                <meshBasicMaterial color='blue' />
              </mesh>
              <mesh key={item.id} position={[i + 1,0,0]} onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                <boxBufferGeometry args={[1,1,1]} />
                <meshBasicMaterial color='blue' />
              </mesh>
              <mesh key={item.id} position={[i + 2,0,0]} onClick={() => removeItem(item.id)}>
                <boxBufferGeometry args={[1,1,1]} />
                <meshBasicMaterial color='blue' />
              </mesh>
              </group>
            </>
          ))}
        </group>
      </>
    );
  }
  
  export default function Scene(){
      return(
        <>
            <PageCustom r3f />
            <Cart r3f/>
        </>
      );
  }