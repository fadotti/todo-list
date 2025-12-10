import "./style.css";
import { Task, project1 } from "./projects";
import { renderHome } from "./homeDOM";
import { renderTasks } from "./taskDOM";
import { addHomepageHandlers } from "./eventListeners";

if(Object.keys(localStorage) < 1) {
  localStorage.setItem("project1", JSON.stringify(project1));

  const a = JSON.parse(localStorage.getItem("project1"));

  Object.defineProperty(a, 'numberOfTasks', {
    get: function() {
      return this.taskList.length
    }
  })

  Object.defineProperty(a, 'addTask', {
    value: function(task) {
      this.taskList.push(task);
    }
  })

  const fifthTask = new Task(
    "Task No. 5",
    "A JSON Task",
    Date().substring(4, 21),
    Date().substring(4, 21),
    'Dec 25 2025 00:00',
    "high",
    true
  )

  a.addTask(fifthTask);

}

renderHome();
addHomepageHandlers();

window.renderTasks = renderTasks;
window.renderHome = renderHome;