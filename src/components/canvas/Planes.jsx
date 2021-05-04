import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Planes({ prices }) {
    const corsSrc = useMemo( () => (process.env.CORS || 'https://espicors.herokuapp.com/'), []);
    const images = prices.map( p => corsSrc + p.product.images[0]);
    console.log(images)
    const textures = useLoader(THREE.TextureLoader, images);
    
    return(
    <mesh position={[1,0,0]}>
    <planeBufferGeometry args={[1,1]} />
    <meshBasicMaterial map={textures[0]} />
    </mesh>
    );
    
  }