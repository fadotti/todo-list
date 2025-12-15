import "./style.css";
import { Task, project1 } from "./projects";
import { renderHome } from "./homeDOM";
import { renderTasks } from "./taskDOM";
import { addHomepageHandlers } from "./eventListeners";

if(Object.keys(localStorage) < 1) {
  localStorage.setItem("project1", JSON.stringify(project1));
}

renderHome();
addHomepageHandlers();

window.renderTasks = renderTasks;
window.renderHome = renderHome;