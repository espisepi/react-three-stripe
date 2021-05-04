import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "next-stripe/client";

export default function Planes({ prices }) {
    const corsSrc = useMemo( () => (process.env.CORS || 'https://espicors.herokuapp.com/'), []);
    const images = useMemo( () => ( prices.map( p => corsSrc + p.product.images[0]) ), []);
    const textures = useLoader(THREE.TextureLoader, images);

    const onClick = useCallback( async (i)=>{
      const priceId = prices[i].id;
      const session = await createCheckoutSession({
        success_url: window.location.href,
        cancel_url: window.location.href,
        line_items: [{ price: priceId, quantity: 1 }],
        payment_method_types: ["card"],
        mode: "payment",
      });
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: session.id });
      }
    },[]);
    
    return (
      <>
        {
          textures.map( (t, i) => (
            <mesh key={'mesh'+i} position={[i * 2 - 2, 0, 0]} onClick={ () => onClick(i) }>
              <planeBufferGeometry args={[1,1]} />
              <meshBasicMaterial map={t} />
            </mesh>
          ))
        }
      </>
    )
    ;
    
  }