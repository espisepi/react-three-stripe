import React, { Suspense } from 'react';
import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { createCheckoutSession } from "next-stripe/client";



// Step 2 - update Box components
const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Planes = dynamic(() => import('@/components/canvas/Planes'), {
  ssr: false,
});

const Page = ({ title, prices, images }) => {
  useStore.setState({ title })
  return (
    <>
      <Box r3f route='/box'/>
      <h1>HOla mundo</h1>
      <Suspense r3f fallback={null}>
        <Planes r3f prices={prices} images={images} />
      </Suspense>
    </>
  )
}

export default Page


export async function getServerSideProps() {

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });
  
  return { props: { prices: prices.data, title: 'Shop test' } };
}