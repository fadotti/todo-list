import { Task, Project } from "./projects";
import { renderHome } from "./homeDOM";
import { renderTasks } from "./taskDOM";
import checkGreen from "./assets/checkGreen.svg";

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
      const lastProjectNumber = Number(Object.keys(localStorage).sort().at(-1).substring(7));
      localStorage.setItem(`project${lastProjectNumber + 1}`, JSON.stringify(newProject));
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
    })
  })

  const editProjectDialogButton = document.querySelector(".edit-project-dialog-row:nth-child(3) > button");
  editProjectDialogButton.addEventListener("click", () => {
    if(document.querySelector("#title-1").checkValidity()) {
      const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage).sort()[lastClickedProjectIndex]));
      if(currentProject.title != document.querySelector("#edit-project-dialog .form-content input").value) {
        currentProject.edited = Date().substring(4, 21);
        currentProject.title = document.querySelector("#edit-project-dialog .form-content input").value;
        localStorage.setItem(Object.keys(localStorage).sort()[lastClickedProjectIndex], JSON.stringify(currentProject));

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
      renderTasks(index);
      addProjectHandlers(index);
    })
  })
}

function addProjectHandlers(projectIndex) {
  const currentProject = JSON.parse(localStorage.getItem(Object.keys(localStorage).sort()[projectIndex]));
  Object.defineProperty(currentProject, 'numberOfTasks', {
      get: function() {
        return this.taskList.length
      }
    })

    Object.defineProperty(currentProject, 'addTask', {
      value: function(task) {
        this.taskList.push(task);
      }
    })
  
  const homeButton = document.querySelector("div#nav > button:nth-child(1)");
  homeButton.addEventListener("click", () => {
    renderHome();
    addHomepageHandlers();
  })

  const addTaskButton = document.querySelector("div#nav > button:nth-child(2)");
  addTaskButton.addEventListener("click", () => {
    document.querySelector("#add-task-dialog").showModal()
  })

  const closeButtons = document.querySelectorAll("button.close-dialog");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
      renderTasks(projectIndex);
      addProjectHandlers(projectIndex);
    })
  })

  const addTaskDialogButton = document.querySelector(".add-task-dialog-row:nth-child(3) > button");
  addTaskDialogButton.addEventListener("click", () => {
    if(document.querySelector("#title-2").checkValidity() &&
    document.querySelector("#due-date").checkValidity()) {
      const year = document.querySelector("#due-date").value.substring(0, 4);
      const day = document.querySelector("#due-date").value.substring(8);
      let month;
      switch(document.querySelector("#due-date").value.substring(5, 7)) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
      }
      const newTask = new Task(
        document.querySelector("#title-2").value,
        document.querySelector("#task-text").value,
        Date().substring(4, 21),
        Date().substring(4, 21),
        `${month} ${day} ${year} 00:00`,
        document.querySelector("#priority-select").value,
        false
      )

      currentProject.addTask(newTask);
      currentProject.edited = Date().substring(4, 21);
      const currentProjectNumber = Number(Object.keys(localStorage).sort().at(projectIndex).substring(7));
      localStorage.setItem(`project${currentProjectNumber}`, JSON.stringify(currentProject));
      addTaskDialogButton.closest("dialog").close();
      renderTasks(projectIndex);
      addProjectHandlers(projectIndex);
    }
  })

  const changeCompletionStatusButtons = document.querySelectorAll(".task-card:not(.dialog-card) > div:nth-child(3) button:nth-child(1)");
  changeCompletionStatusButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      currentProject.taskList[index].isDone = (currentProject.taskList[index].isDone) ? false : true;
      currentProject.taskList[index].edited = Date().substring(4, 21);
      currentProject.edited = Date().substring(4, 21);
      const currentProjectNumber = Number(Object.keys(localStorage).sort().at(projectIndex).substring(7));
      localStorage.setItem(`project${currentProjectNumber}`, JSON.stringify(currentProject));
      renderTasks(projectIndex);
      addProjectHandlers(projectIndex);
    })
  })

  let lastClickedTaskIndex;
  const editTaskButtons = document.querySelectorAll(".task-card:not(.dialog-card) > div:nth-child(3) button:nth-child(2)");
  editTaskButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelector("#title-3").value = currentProject.taskList[index].title;
      document.querySelector("#task-text-2").value = currentProject.taskList[index].content;
      const year = currentProject.taskList[index].dueDate.substring(7, 11);
      const day = currentProject.taskList[index].dueDate.substring(4, 6);
      let month;
      switch(currentProject.taskList[index].dueDate.substring(0, 3)) {
        case "Jan":
          month = "01";
          break;
        case "Feb":
          month = "02";
          break;
        case "Mar":
          month = "03";
          break;
        case "Apr":
          month = "04";
          break;
        case "May":
          month = "05";
          break;
        case "Jun":
          month = "06";
          break;
        case "Jul":
          month = "07";
          break;
        case "Aug":
          month = "08";
          break;
        case "Sep":
          month = "09";
          break;
        case "Oct":
          month = "10";
          break;
        case "Nov":
          month = "11";
          break;
        case "Dec":
          month = "12";
          break;
      }
      document.querySelector("#due-date-2").value = `${year}-${month}-${day}`;
      document.querySelector("#priority-select-2").value = currentProject.taskList[index].priority;

      lastClickedTaskIndex = index;
      document.querySelector("#edit-task-dialog").showModal();
    })
  })

  const editTaskDialogButton = document.querySelector("#edit-task-dialog div:nth-child(3) > button");
  editTaskDialogButton.addEventListener("click", () => {
    if(document.querySelector("#title-3").checkValidity() &&
    document.querySelector("#due-date-2").checkValidity()) {
      const year = document.querySelector("#due-date-2").value.substring(0, 4);
      const day = document.querySelector("#due-date-2").value.substring(8);
      let month;
      switch(document.querySelector("#due-date-2").value.substring(5, 7)) {
        case "01":
          month = "Jan";
          break;
        case "02":
          month = "Feb";
          break;
        case "03":
          month = "Mar";
          break;
        case "04":
          month = "Apr";
          break;
        case "05":
          month = "May";
          break;
        case "06":
          month = "Jun";
          break;
        case "07":
          month = "Jul";
          break;
        case "08":
          month = "Aug";
          break;
        case "09":
          month = "Sep";
          break;
        case "10":
          month = "Oct";
          break;
        case "11":
          month = "Nov";
          break;
        case "12":
          month = "Dec";
          break;
      }

      if(currentProject.taskList[lastClickedTaskIndex].title != document.querySelector("#title-3").value ||
      currentProject.taskList[lastClickedTaskIndex].content != document.querySelector("#task-text-2").value ||
      currentProject.taskList[lastClickedTaskIndex].dueDate != `${month} ${day} ${year} 00:00` ||
      currentProject.taskList[lastClickedTaskIndex].priority != document.querySelector("#priority-select-2").value) {
        currentProject.taskList[lastClickedTaskIndex].edited = Date().substring(4, 21);
        currentProject.edited = Date().substring(4, 21);
        currentProject.taskList[lastClickedTaskIndex].title = document.querySelector("#title-3").value;
        currentProject.taskList[lastClickedTaskIndex].content = document.querySelector("#task-text-2").value;
        currentProject.taskList[lastClickedTaskIndex].dueDate = `${month} ${day} ${year} 00:00`;
        currentProject.taskList[lastClickedTaskIndex].priority = document.querySelector("#priority-select-2").value;

        const currentProjectNumber = Number(Object.keys(localStorage).sort().at(projectIndex).substring(7));
        localStorage.setItem(`project${currentProjectNumber}`, JSON.stringify(currentProject));
      }

      editTaskDialogButton.closest("dialog").close();
      renderTasks(projectIndex);
      addProjectHandlers(projectIndex);
    }
  })

  const deleteTaskButtons = document.querySelectorAll(".task-card:not(.dialog-card) > div:nth-child(3) button:nth-child(3)");
  deleteTaskButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      lastClickedTaskIndex = index;
      document.querySelector("#delete-task-dialog").showModal();
    })
  })

  const deleteTaskDialogButton = document.querySelector("#delete-task-dialog div:nth-child(3) > button");
  deleteTaskDialogButton.addEventListener("click", () => {
    currentProject.taskList.splice(lastClickedTaskIndex, 1);
    currentProject.edited = Date().substring(4, 21);

    const currentProjectNumber = Number(Object.keys(localStorage).sort().at(projectIndex).substring(7));
    localStorage.setItem(`project${currentProjectNumber}`, JSON.stringify(currentProject));

    deleteTaskDialogButton.closest("dialog").close();
    renderTasks(projectIndex);
    addProjectHandlers(projectIndex);
  })

  const taskCards = document.querySelectorAll(".task-card:not(.dialog-card)");
  taskCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      lastClickedTaskIndex = index;
      document.querySelector("#task-dialog > .task-card > div:first-child > span")
        .textContent = currentProject.taskList[index].title;
      document.querySelector("#task-dialog > .task-card > div:nth-child(2) > div")
        .innerHTML += ` ${currentProject.taskList[index].content.replaceAll("\n", "<br>")}`;
      document.querySelector("#task-dialog > .task-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)")
        .innerHTML += `${currentProject.taskList[index].created}`;
      document.querySelector("#task-dialog > .task-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)")
        .innerHTML += `${currentProject.taskList[index].edited}`;
      document.querySelector("#task-dialog > .task-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)")
        .innerHTML += `${currentProject.taskList[index].dueDate}`;
      if(currentProject.taskList[index].isDone === true) {
        document.querySelector(".task-card.dialog-card > div:nth-child(3) > div:nth-child(2) > button:nth-child(1) > img")
          .src = checkGreen;
        document.querySelector("#task-dialog > .task-card").className += " completed";
      }
      document.querySelector("#task-dialog").showModal();
    })
  })

  const changeCompletionStatusDialogButton = document.querySelector(".task-card.dialog-card > div:nth-child(3) button:nth-child(1)");
  changeCompletionStatusDialogButton.addEventListener("click", (event) => {
    event.stopPropagation();
    currentProject.taskList[lastClickedTaskIndex].isDone = (currentProject.taskList[lastClickedTaskIndex].isDone) ? false : true;
    currentProject.taskList[lastClickedTaskIndex].edited = Date().substring(4, 21);
    currentProject.edited = Date().substring(4, 21);
    const currentProjectNumber = Number(Object.keys(localStorage).sort().at(projectIndex).substring(7));
    localStorage.setItem(`project${currentProjectNumber}`, JSON.stringify(currentProject));

    renderTasks(projectIndex);
    addProjectHandlers(projectIndex);

    document.querySelectorAll(".task-card:not(.dialog-card)")[lastClickedTaskIndex].click();
  })

  const editTaskFromDialogButton = document.querySelector(".task-card.dialog-card > div:nth-child(3) button:nth-child(2)");
  editTaskFromDialogButton.addEventListener("click", (event) => {
    event.stopPropagation();
    editTaskFromDialogButton.closest("dialog").close();

    editTaskButtons[lastClickedTaskIndex].click();
  })

  const deleteTaskFromDialogButton = document.querySelector(".task-card.dialog-card > div:nth-child(3) button:nth-child(3)");
  deleteTaskFromDialogButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTaskFromDialogButton.closest("dialog").close();

    deleteTaskButtons[lastClickedTaskIndex].click();
  })
}

export {addHomepageHandlers}