import * as THREE from 'three';
import { FC, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

const Background: FC = () => {
  return (
    <div className="absolute z-50 top-0 left-0 w-screen h-screen">
      <Canvas
        shadows={true}
        camera={{
          position: [0, 15, 0],
        }}
        style={{
          background: 'black',
        }}
      >
        <ambientLight color={'black'} intensity={0.3} />
        <mesh receiveShadow={true}>
          <boxBufferGeometry args={[20, 1, 10]} />
          <meshPhysicalMaterial color="white" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Background;
