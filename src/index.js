import { h, render } from "preact";
import "./index.scss";

let root;

function init() {
  root = render(
    <h1>Differential serving</h1>,
    document.getElementById("app"),
    root
  );
}

init();
