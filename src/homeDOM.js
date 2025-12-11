import plus from "./assets/plus.svg";
import openFolder from "./assets/open-svgrepo-com.svg";
import pencil from "./assets/pencil.svg";
import trashCan from "./assets/delete.svg";
import windowClose from "./assets/window-close.svg";

function renderHome() {
  const body = document.querySelector("body");
  body.replaceChildren([]);

  const div = document.createElement("div");
  div.id = "home-container";

  body.appendChild(div.cloneNode(true));

  div.id = "nav";
  document.querySelector("#home-container").appendChild(div.cloneNode(true));

  const button = document.createElement("button");
  button.setAttribute("type", "button");
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

  Object.keys(localStorage).sort().forEach(key => {
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
    document.querySelector("div.project-card:last-child").append(div.cloneNode(true), div.cloneNode(true), div.cloneNode(true));

    span.textContent = projectObject.title;
    document.querySelector("div.project-card:last-child > div:first-child").append(span.cloneNode(true));

    div.textContent = `Created: ${projectObject.created}`;
    document.querySelector("div.project-card:last-child > div:nth-child(2)").append(div.cloneNode(true));

    div.textContent = `Last Edited: ${projectObject.edited}`;
    document.querySelector("div.project-card:last-child > div:nth-child(2)").append(div.cloneNode(true));

    div.textContent = `Number of Tasks: ${projectObject.numberOfTasks}`;
    document.querySelector("div.project-card:last-child > div:nth-child(2)").append(div.cloneNode(true));

    document.querySelector("div.project-card:last-child > div:nth-child(3)").append(button.cloneNode(true), button.cloneNode(true), button.cloneNode(true));

    image.src = openFolder;
    document.querySelector("div.project-card:last-child > div:nth-child(3) > button:first-child").append(image.cloneNode(true));

    image.src = pencil;
    document.querySelector("div.project-card:last-child > div:nth-child(3) > button:nth-child(2)").append(image.cloneNode(true));

    image.src = trashCan;
    document.querySelector("div.project-card:last-child > div:nth-child(3) > button:nth-child(3)").append(image.cloneNode(true));
  })

  const dialog = document.createElement("dialog");
  dialog.id = "add-project-dialog";
  body.appendChild(dialog.cloneNode(true));

  const form = document.createElement("form");
  form.method = "dialog";
  document.querySelector("#add-project-dialog").append(form.cloneNode(true));
  
  div.textContent = "";
  div.className = "add-project-dialog-row";
  document.querySelector("#add-project-dialog > form").append(div.cloneNode(true));

  button.className = "close-dialog";
  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row").append(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row > button").append(image.cloneNode(true));

  div.className = "add-project-dialog-row form-content";
  document.querySelector("#add-project-dialog > form").append(div.cloneNode(true));

  div.removeAttribute('class');
  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row.form-content").append(div.cloneNode(true));
  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row.form-content > div").append(div.cloneNode(true));

  const label = document.createElement("label");
  const input = document.createElement("input");
  label.setAttribute("for", "title");
  label.textContent = "Project Title* "
  input.setAttribute("type", "text");
  input.setAttribute("id", "title");
  input.setAttribute("minlength", "2");
  input.setAttribute("maxlength", "25");
  input.setAttribute("required", '');

  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row.form-content > div > div")
    .append(label.cloneNode(true), input.cloneNode(true));

  div.setAttribute("class", "add-project-dialog-row");
  button.removeAttribute("class");
  button.setAttribute("type", "submit");
  button.textContent = "Add Project";
  
  document.querySelector("#add-project-dialog > form").append(div.cloneNode(true));
  document.querySelector("#add-project-dialog > form > div.add-project-dialog-row:nth-child(3)").append(button.cloneNode(true));
  button.removeAttribute("type");



  dialog.id = "edit-project-dialog";
  body.appendChild(dialog.cloneNode(true));

  document.querySelector("#edit-project-dialog").append(form.cloneNode(true));
  
  div.textContent = "";
  div.className = "edit-project-dialog-row";
  document.querySelector("#edit-project-dialog > form").append(div.cloneNode(true));

  button.className = "close-dialog";
  button.textContent = "";
  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row").append(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row > button").append(image.cloneNode(true));

  div.className = "edit-project-dialog-row form-content";
  document.querySelector("#edit-project-dialog > form").append(div.cloneNode(true));

  div.removeAttribute('class');
  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row.form-content").append(div.cloneNode(true));
  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row.form-content > div").append(div.cloneNode(true));

  label.setAttribute("for", "title-1");
  label.textContent = "Project Title* "
  input.setAttribute("type", "text");
  input.setAttribute("id", "title-1");
  input.setAttribute("minlength", "2");
  input.setAttribute("maxlength", "25");
  input.setAttribute("required", '');

  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row.form-content > div > div")
    .append(label.cloneNode(true), input.cloneNode(true));

  div.setAttribute("class", "edit-project-dialog-row");
  button.removeAttribute("class");
  button.setAttribute("type", "submit");
  button.textContent = "Apply Changes";
  
  document.querySelector("#edit-project-dialog > form").append(div.cloneNode(true));
  document.querySelector("#edit-project-dialog > form > div.edit-project-dialog-row:nth-child(3)").append(button.cloneNode(true));
  button.removeAttribute("type");



  dialog.id = "delete-project-dialog";
  body.appendChild(dialog.cloneNode(true));

  document.querySelector("#delete-project-dialog").append(form.cloneNode(true));
  
  div.textContent = "";
  div.className = "delete-project-dialog-row";
  document.querySelector("#delete-project-dialog > form").append(div.cloneNode(true));

  button.className = "close-dialog";
  button.textContent = "";
  document.querySelector("#delete-project-dialog > form > div.delete-project-dialog-row").append(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector("#delete-project-dialog > form > div.delete-project-dialog-row > button").append(image.cloneNode(true));

  div.className = "delete-project-dialog-row form-content";
  document.querySelector("#delete-project-dialog > form").append(div.cloneNode(true));

  div.removeAttribute('class');
  div.innerHTML = "Are you sure you wish to delete this project? <br> This action is irreversible.";

  document.querySelector("#delete-project-dialog > form > div.delete-project-dialog-row.form-content").append(div.cloneNode(true));

  div.setAttribute("class", "delete-project-dialog-row");
  div.innerHTML ='';
  button.removeAttribute("class");
  button.textContent = "Delete Project";
  
  document.querySelector("#delete-project-dialog > form").append(div.cloneNode(true));
  document.querySelector("#delete-project-dialog > form > div.delete-project-dialog-row:nth-child(3)").append(button.cloneNode(true));
}

export {renderHome}