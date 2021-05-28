import React from "react";
import Cube from "./components/Cube";
import Cylinder from "./components/Cylinder";

import { Engine, Scene } from "react-babylonjs";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import queryString from "query-string";

export const App = () => {
  const parsed = queryString.parse(window.location.search);

  const Component = parsed.type === "cube" ? Cube : Cylinder;
  const width = parsed.width?  parsed.width : 'auto';
  const height = parsed.width?  parsed.width : 'auto';

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS" width={width} height={height}>
      <Scene>
        <freeCamera
          name="camera1"
          position={new Vector3(0, 5, -10)}
          setTarget={[Vector3.Zero()]}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <Component
          color={parsed.color === "red" ? Color3.Red() : Color3.Blue()}
        />
      </Scene>
    </Engine>
  );
};
