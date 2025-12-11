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

      const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage).sort()[index]));
      document.querySelector("#edit-project-dialog .form-content input").value = currentProject.title;
      lastClickedProjectIndex = index;
      console.log(index);
    })
  })

  const editProjectDialogButton = document.querySelector(".edit-project-dialog-row:nth-child(3) > button");
  editProjectDialogButton.addEventListener("click", () => {
    if(document.querySelector("#title-1").checkValidity()) {
      const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage).sort()[lastClickedProjectIndex]));
      if(currentProject.title != document.querySelector("#edit-project-dialog .form-content input").value) {
        currentProject.edited = Date().substring(4, 21);
        currentProject.title = document.querySelector("#edit-project-dialog .form-content input").value;
        localStorage.setItem(`project${lastClickedProjectIndex + 1}`, JSON.stringify(currentProject));

        renderHome();
        addHomepageHandlers();
      }   
    }
  })

  const deleteProjectButtons = document.querySelectorAll(".project-card > div:nth-child(3) > button:nth-child(3)");
  deleteProjectButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      document.querySelector("#delete-project-dialog").showModal()
      lastClickedProjectIndex = index;
    })
  })

  const deleteProjectDialogButton = document.querySelector(".delete-project-dialog-row:nth-child(3) > button");
  deleteProjectDialogButton.addEventListener("click", () => {
      const currentProjectKey = Object.keys(localStorage).sort()[lastClickedProjectIndex];
        localStorage.removeItem(currentProjectKey);

        renderHome();
        addHomepageHandlers();
  })

  const openProjectButtons = document.querySelectorAll(".project-card > div:nth-child(3) > button:nth-child(1)");
  openProjectButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      renderTasks(index, 0);
      addProjectHandlers(0);
    })
  })
}

function addProjectHandlers(projectIndex) {
  const homeButton = document.querySelector("div#nav > button:nth-child(1)");
  homeButton.addEventListener("click", () => {
    renderHome();
    addHomepageHandlers();
  })
}

export {addHomepageHandlers}