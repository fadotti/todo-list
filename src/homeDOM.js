import plus from "./assets/plus.svg";
import openFolder from "./assets/open-svgrepo-com.svg";
import pencil from "./assets/pencil.svg";
import trashCan from "./assets/delete.svg";

function renderHome() {
  const body = document.querySelector("body");
  body.replaceChildren([]);

  const div = document.createElement("div");
  div.id = "home-container";

  body.appendChild(div.cloneNode(true));

  div.id = "nav";
  document.querySelector("#home-container").appendChild(div.cloneNode(true));

  const button = document.createElement("button");
  document.querySelector("#nav").appendChild(button.cloneNode(true));

  const image = document.createElement("img");
  image.src = plus;
  const span = document.createElement("span");
  span.textContent = "Add a Project";

  document.querySelector("#nav > button").append(image.cloneNode(true), span.cloneNode(true));
}

export {renderHome}





