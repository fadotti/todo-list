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

  div.removeAttribute('id');
  document.querySelector("#home-container").appendChild(div.cloneNode(true));

  div.id = "project-banner";
  div.textContent = "My Projects";
  document.querySelector("#home-container > div:nth-child(2)").appendChild(div.cloneNode(true));

  Object.keys(localStorage).forEach(key => {
    const projectObject = JSON.parse(localStorage.getItem(key));
    Object.defineProperty(projectObject, 'numberOfTasks', {
      get: function() {
        return this.taskList.length
      }
    })
    div.className = "project-card";
    div.textContent = '';
    div.removeAttribute('id');
    document.querySelector("#home-container > div:nth-child(2)").appendChild(div.cloneNode(true));

    div.removeAttribute('class');
    document.querySelector("div.project-card").append(div.cloneNode(true), div.cloneNode(true), div.cloneNode(true));

    span.textContent = projectObject.title;
    document.querySelector("div.project-card > div:first-child").append(span.cloneNode(true));

    div.textContent = `Created: ${projectObject.created}`;
    document.querySelector("div.project-card > div:nth-child(2)").append(div.cloneNode(true));

    div.textContent = `Last Edited: ${projectObject.created}`;
    document.querySelector("div.project-card > div:nth-child(2)").append(div.cloneNode(true));

    div.textContent = `Number of Tasks: ${projectObject.numberOfTasks}`;
    document.querySelector("div.project-card > div:nth-child(2)").append(div.cloneNode(true));

    document.querySelector("div.project-card > div:nth-child(3)").append(button.cloneNode(true), button.cloneNode(true), button.cloneNode(true));

    image.src = openFolder;
    document.querySelector("div.project-card > div:nth-child(3) > button:first-child").append(image.cloneNode(true));

    image.src = pencil;
    document.querySelector("div.project-card > div:nth-child(3) > button:nth-child(2)").append(image.cloneNode(true));

    image.src = trashCan;
    document.querySelector("div.project-card > div:nth-child(3) > button:nth-child(3)").append(image.cloneNode(true));
  })
}

export {renderHome}