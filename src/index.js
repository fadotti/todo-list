import "./style.css";

import { firstProject } from "./projects";

localStorage.setItem("firstProject", JSON.stringify(firstProject));

const a = localStorage.getItem("firstProject");

console.log(a);