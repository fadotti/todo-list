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

  let lastClickedProjectIndex;
  const editProjectButtons = document.querySelectorAll(".project-card > div:nth-child(3) > button:nth-child(2)");
  editProjectButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      document.querySelector("#edit-project-dialog").showModal()

      const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage)[index]));
      document.querySelector("#edit-project-dialog .form-content input").value = currentProject.title;
      lastClickedProjectIndex = index;
    })
  })

  const editProjectDialogButton = document.querySelector(".edit-project-dialog-row:nth-child(3) > button");
  editProjectDialogButton.addEventListener("click", () => {
    console.log(lastClickedProjectIndex);
    if(document.querySelector("#title-1").checkValidity()) {
      const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage)[lastClickedProjectIndex]));
      if(currentProject.title != document.querySelector("#edit-project-dialog .form-content input").value) {
        currentProject.edited = Date().substring(4, 21);
        currentProject.title = document.querySelector("#edit-project-dialog .form-content input").value;
        localStorage.setItem(`project${lastClickedProjectIndex + 1}`, JSON.stringify(currentProject));

        renderHome();
        addHomepageHandlers();
      }   
    }
  })
}

export {addHomepageHandlers}