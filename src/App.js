import React, { useEffect, useState } from "react";
import Cube from "./components/Cube";
import Cylinder from "./components/Cylinder";

import { Engine, Scene } from "react-babylonjs";
import { Color3, Vector3 } from "@babylonjs/core/Maths/math";
import queryString from "query-string";

export const App = () => {
  const [type, setType] = useState("cube");
  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
  const [color, setColor] = useState(Color3.Red());

  const queryParams = window.location.search;

  useEffect(() => {
    const parsed = (queryParams && queryString.parse(queryParams)) || {};

    if (parsed.height) {
      setHeight(parsed.height);
    }

    if (parsed.width) {
      setWidth(parsed.width);
    }

    if (parsed.type) {
      setType(parsed.type);
    }

    if (parsed.color) {
      setColor(parsed.color === "red" ? Color3.Red() : Color3.Blue());
    }

    // event handlers
    window.onmessage = function (e) {
      if (e.data && e.data.type == "change-model") {
        console.log(`received message: [${e.data.type}, ${e.data.value}]`);
        setType(e.data.value);

        const node = document.getElementById('shop-in-3d-comm');
        console.log("######", node)
        node && node.contentWindow.postMessage({ type: 'TEST', value: 'oi' }, '*');
      }
    };

  }, [queryParams]);


  return (
    <Engine antialias canvasId="babylonJS" width={width} height={height}>
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
        {type === "cube" && <Cube color={color} />}
        {type === "cylinder" && <Cylinder color={color} />}
      </Scene>
    </Engine>
  );
};
