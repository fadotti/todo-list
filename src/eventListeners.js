import { Task, Project } from "./projects";
import { renderHome } from "./homeDOM";
import { renderTasks } from "./taskDOM";

function addHomepageHandlers() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if(event.code == 'Enter') {
        event.preventDefault();
      }
    })
  })

  const addProjectButton = document.querySelector("div#nav > button");
  addProjectButton.addEventListener("click", () => {
    document.querySelector("#add-project-dialog").showModal()
  })

  const closeButtons = document.querySelectorAll("button.close-dialog");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog").close()
    })
  })

  const addProjectDialogButton = document.querySelector(".add-project-dialog-row:nth-child(3) > button");
  addProjectDialogButton.addEventListener("click", () => {
    if(document.querySelector("#title").checkValidity()) {
      const newProject = new Project(
        document.querySelector("#title").value,
        Date().substring(4, 21),
        Date().substring(4, 21),
        []
      )
      addProjectDialogButton.closest("dialog").close();
      localStorage.setItem(`project${Object.keys(localStorage).length + 1}`, JSON.stringify(newProject));
      renderHome();
      addHomepageHandlers();
    }
  })
}

export {addHomepageHandlers}