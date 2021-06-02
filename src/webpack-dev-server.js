/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 */
import { RemoteComponent } from "@paciolan/remote-component";
import React from "react";
import ReactDOM from "react-dom";
import LocalComponent from "./index.js";

// different paths for localhost vs s3
const url =
  process.env.NODE_ENV === "development"
    ? "/dist/remote-react-bundle.js"
    : "remote-react-bundle.js";

const node = document.getElementById("root");

const Component = props =>
  process.env.NODE_ENV === "development"
    ? <LocalComponent {...props} />
    : <RemoteComponent url={url} {...props} />; // prettier-ignore

const App = props => (
  <>
    <Component {...props} />
  </>
);

ReactDOM.render(<App />, node);
