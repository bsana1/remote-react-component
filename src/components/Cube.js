import React, { useEffect, useRef } from "react";
import { useScene } from "react-babylonjs";
import { Vector3, Color3 } from "@babylonjs/core/Maths/math";

const rpm = 5;
const RotatingElement = props => {
  // access Babylon Scene
  const scene = useScene();
  // access refs to Babylon objects in scene like DOM nodes
  const boxRef = useRef(null);

  // there is also a built-in hook called useBeforeRender that does will do this:
  useEffect(() => {
    if (boxRef.current) {
      const handler = scene.registerBeforeRender(() => {
        let deltaTimeInMillis = scene.getEngine().getDeltaTime();
        if (boxRef.current) {
          boxRef.current.rotation[props.rotationAxis] +=
            (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        }
      });
      return () => {
        scene.unregisterBeforeRender(handler);
      };
    }
  }, [boxRef.current]);

  return (
    <box ref={boxRef} size={2} position={props.position}>
      <standardMaterial
        diffuseColor={props.color}
        specularColor={Color3.Black()}
      />
    </box>
  );
};

const Cube = ({ color }) => {
  return (
    <RotatingElement
      color={color}
      position={new Vector3(-2, 0, 0)}
      rotationAxis="y"
    />
  );
};

export default Cube;
