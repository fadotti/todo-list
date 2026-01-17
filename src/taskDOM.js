import plus from "./assets/plus.svg";
import pencil from "./assets/pencil.svg";
import trashCan from "./assets/delete.svg";
import windowClose from "./assets/window-close.svg";
import home from "./assets/home.svg";
import check from "./assets/check.svg";
import checkGreen from "./assets/checkGreen.svg";

function renderTasks(projectIndex) {
  const body = document.querySelector("body");
  body.replaceChildren([]);

  const div = document.createElement("div");
  div.id = "project-container";

  body.appendChild(div.cloneNode(true));

  div.id = "nav";
  document.querySelector("#project-container").appendChild(div.cloneNode(true));

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  document.querySelector("#nav").appendChild(button.cloneNode(true));

  const image = document.createElement("img");
  image.src = home;
  const span = document.createElement("span");
  span.textContent = "Home";
  document.querySelector("#nav > button").append(image.cloneNode(true), span.cloneNode(true));

  document.querySelector("#nav").appendChild(button.cloneNode(true));

  image.src = plus;
  span.textContent = "Add a Task";
  document.querySelector("#nav > button:nth-child(2)").append(image.cloneNode(true), span.cloneNode(true));




  div.removeAttribute('id');
  document.querySelector("#project-container").appendChild(div.cloneNode(true));

  const project = JSON.parse(localStorage.getItem(Object.keys(localStorage).sort()[projectIndex]));

  div.id = "project-banner";
  div.textContent = project.title;
  document.querySelector("#project-container > div:nth-child(2)").appendChild(div.cloneNode(true));

  div.removeAttribute('id');

  project.taskList.forEach(task => {
    div.className = "task-card";
    if(task.isDone === true) {
      div.className += " completed";
    }
    div.textContent = "";
    document.querySelector("#project-container > div:nth-child(2)").appendChild(div.cloneNode(true));

    div.removeAttribute('class');
    document.querySelector(".task-card:last-child").appendChild(div.cloneNode(true));

    span.textContent = task.title;
    document.querySelector(".task-card:last-child > div").appendChild(span.cloneNode(true));

    document.querySelector(".task-card:last-child").appendChild(div.cloneNode(true));

    document.querySelector(".task-card:last-child > div:nth-child(2)")
      .append(div.cloneNode(true), div.cloneNode(true), div.cloneNode(true), div.cloneNode(true));

    document.querySelector(".task-card:last-child > div:nth-child(2) > div:nth-child(1)")
      .innerHTML = `<strong>Task:</strong> ${task.content.replaceAll("\n", "<br>")}`;
    document.querySelector(".task-card:last-child > div:nth-child(2) > div:nth-child(2)")
      .innerHTML = `<strong>Created:</strong> ${task.created}`;
    document.querySelector(".task-card:last-child > div:nth-child(2) > div:nth-child(3)")
      .innerHTML = `<strong>Last Edited:</strong> ${task.edited}`;
    document.querySelector(".task-card:last-child > div:nth-child(2) > div:nth-child(4)")
      .innerHTML = `<strong>Due Date:</strong> ${task.dueDate}`;

    document.querySelector(".task-card:last-child").appendChild(div.cloneNode(true));

    if(task.priority === 'low') {
      div.className = "low-priority";
      div.textContent = "Priority: Low";
    }
    if(task.priority === 'medium') {
      div.className = "medium-priority";
      div.textContent = "Priority: Medium";
    }
    if(task.priority === 'high') {
      div.className = "high-priority";
      div.textContent = "Priority: High";
    }

    document.querySelector(".task-card:last-child > div:nth-child(3)").appendChild(div.cloneNode(true));

    div.removeAttribute('class');
    div.textContent = "";
    document.querySelector(".task-card:last-child > div:nth-child(3)").appendChild(div.cloneNode(true));

    document.querySelector(".task-card:last-child > div:nth-child(3) > div:nth-child(2)")
      .append(button.cloneNode(true), button.cloneNode(true), button.cloneNode(true));

    if(task.isDone === true) {
      image.src = checkGreen;
    } else {
      image.src = check;
    }
    document.querySelector(".task-card:last-child > div:nth-child(3) > div:nth-child(2) > button:nth-child(1)")
      .appendChild(image.cloneNode(true));

    image.src = pencil;
    document.querySelector(".task-card:last-child > div:nth-child(3) > div:nth-child(2) > button:nth-child(2)")
      .appendChild(image.cloneNode(true));

    image.src = trashCan;
    document.querySelector(".task-card:last-child > div:nth-child(3) > div:nth-child(2) > button:nth-child(3)")
      .appendChild(image.cloneNode(true));
  })



  const dialog = document.createElement("dialog");
  dialog.id = "task-dialog";
  body.appendChild(dialog.cloneNode(true));

  div.className = "task-card dialog-card";
  div.textContent = "";
  document.querySelector("dialog#task-dialog").appendChild(div.cloneNode(true));

  div.removeAttribute('class');
  document.querySelector(".task-card.dialog-card").appendChild(div.cloneNode(true));

  span.textContent = "";
  document.querySelector(".task-card.dialog-card > div").appendChild(span.cloneNode(true));
  
  button.textContent = "";
  button.className = "close-dialog"
  document.querySelector(".task-card.dialog-card > div").appendChild(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector(".task-card.dialog-card > div > button").appendChild(image.cloneNode(true));

  document.querySelector(".task-card.dialog-card").appendChild(div.cloneNode(true));

  document.querySelector(".task-card.dialog-card > div:nth-child(2)")
    .append(div.cloneNode(true), div.cloneNode(true));

  document.querySelector(".task-card.dialog-card > div:nth-child(2) > div:nth-child(1)")
    .innerHTML = `<strong>Task:</strong> `;

  document.querySelector(".task-card.dialog-card > div:nth-child(2) > div:nth-child(2)")
    .append(div.cloneNode(true), div.cloneNode(true), div.cloneNode(true));

  document.querySelector(".task-card.dialog-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)")
    .innerHTML = `<strong>Created:</strong> `;
  document.querySelector(".task-card.dialog-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)")
    .innerHTML = `<strong>Last Edited:</strong> `;
  document.querySelector(".task-card.dialog-card > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)")
    .innerHTML = `<strong>Due Date:</strong> `;

  document.querySelector(".task-card.dialog-card").appendChild(div.cloneNode(true));
  document.querySelector(".task-card.dialog-card > div:nth-child(3)").appendChild(div.cloneNode(true));

  div.removeAttribute('class');
  div.textContent = "";
  document.querySelector(".task-card.dialog-card > div:nth-child(3)").appendChild(div.cloneNode(true));

  button.removeAttribute("class");
  document.querySelector(".task-card.dialog-card > div:nth-child(3) > div:nth-child(2)")
    .append(button.cloneNode(true), button.cloneNode(true), button.cloneNode(true));

    image.src = check;
  document.querySelector(".task-card.dialog-card > div:nth-child(3) > div:nth-child(2) > button:nth-child(1)")
    .appendChild(image.cloneNode(true));

  image.src = pencil;
  document.querySelector(".task-card.dialog-card > div:nth-child(3) > div:nth-child(2) > button:nth-child(2)")
    .appendChild(image.cloneNode(true));

  image.src = trashCan;
  document.querySelector(".task-card.dialog-card > div:nth-child(3) > div:nth-child(2) > button:nth-child(3)")
    .appendChild(image.cloneNode(true));


    

  
  dialog.id = "add-task-dialog";
  body.appendChild(dialog.cloneNode(true));

  const form = document.createElement("form");
  form.method = "dialog";
  document.querySelector("#add-task-dialog").append(form.cloneNode(true));
  
  div.textContent = "";
  div.className = "add-task-dialog-row";
  document.querySelector("#add-task-dialog > form").append(div.cloneNode(true));

  button.className = "close-dialog";
  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row").append(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row > button").append(image.cloneNode(true));

  div.className = "add-task-dialog-row form-content";
  document.querySelector("#add-task-dialog > form").append(div.cloneNode(true));

  div.removeAttribute('class');

  const label = document.createElement("label");
  const input = document.createElement("input");
  label.setAttribute("for", "title-2");
  label.textContent = "Task Name* ";
  input.setAttribute("type", "text");
  input.setAttribute("id", "title-2");
  input.setAttribute("minlength", "2");
  input.setAttribute("maxlength", "25");
  input.setAttribute("required", '');

  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row.form-content")
    .append(label.cloneNode(true), input.cloneNode(true));

  label.setAttribute("for", "task-text");
  label.textContent = "Task Details ";
  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "task-content");
  textarea.setAttribute("id", "task-text");
  textarea.setAttribute("rows", '10');

  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row.form-content")
    .append(label.cloneNode(true), textarea.cloneNode(true));

  label.setAttribute("for", "due-date");
  label.textContent = "Due Date* ";
  input.setAttribute("type", "date");
  input.setAttribute("id", "due-date");
  input.setAttribute("required", "");
  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row.form-content")
    .append(label.cloneNode(true), input.cloneNode(true));

  label.setAttribute("for", "priority-select");
  label.textContent = "Priority* ";
  const select = document.createElement("select");
  select.setAttribute("name", "priority");
  select.setAttribute("id", "priority-select");
  const option = document.createElement("option");
  option.setAttribute("value", "low");
  option.textContent = "Low";
  select.appendChild(option.cloneNode(true));
  option.setAttribute("value", "medium");
  option.textContent = "Medium";
  select.appendChild(option.cloneNode(true));
  option.setAttribute("value", "high");
  option.textContent = "High";
  select.appendChild(option.cloneNode(true));

  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row.form-content")
    .append(label.cloneNode(true), select.cloneNode(true));

  div.setAttribute("class", "add-task-dialog-row");
  button.removeAttribute("class");
  button.setAttribute("type", "submit");
  button.textContent = "Add Task";
  
  document.querySelector("#add-task-dialog > form").append(div.cloneNode(true));
  document.querySelector("#add-task-dialog > form > div.add-task-dialog-row:nth-child(3)").append(button.cloneNode(true));
  button.removeAttribute("type");






  dialog.id = "edit-task-dialog";
  body.appendChild(dialog.cloneNode(true));

  form.method = "dialog";
  document.querySelector("#edit-task-dialog").append(form.cloneNode(true));
  
  div.textContent = "";
  div.className = "edit-task-dialog-row";
  document.querySelector("#edit-task-dialog > form").append(div.cloneNode(true));

  button.textContent = "";
  button.className = "close-dialog";
  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row").append(button.cloneNode(true));

  image.src = windowClose;
  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row > button").append(image.cloneNode(true));

  div.className = "edit-task-dialog-row form-content";
  document.querySelector("#edit-task-dialog > form").append(div.cloneNode(true));

  div.removeAttribute('class');

  label.setAttribute("for", "title-3");
  label.textContent = "Task Name* ";
  input.setAttribute("type", "text");
  input.setAttribute("id", "title-3");
  input.setAttribute("minlength", "2");
  input.setAttribute("maxlength", "25");
  input.setAttribute("required", '');

  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row.form-content")
    .append(label.cloneNode(true), input.cloneNode(true));

  label.setAttribute("for", "task-text-2");
  label.textContent = "Task Details ";
  textarea.setAttribute("name", "task-content");
  textarea.setAttribute("id", "task-text-2");
  textarea.setAttribute("rows", '10');

  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row.form-content")
    .append(label.cloneNode(true), textarea.cloneNode(true));

  label.setAttribute("for", "due-date-2");
  label.textContent = "Due Date* ";
  input.setAttribute("type", "date");
  input.setAttribute("id", "due-date-2");
  input.setAttribute("required", "");
  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row.form-content")
    .append(label.cloneNode(true), input.cloneNode(true));

  label.setAttribute("for", "priority-select-2");
  label.textContent = "Priority* ";
  select.setAttribute("name", "priority-2");
  select.setAttribute("id", "priority-select-2");

  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row.form-content")
    .append(label.cloneNode(true), select.cloneNode(true));

  label.setAttribute("for", "priority-select");
  label.textContent = "Priority* ";

  div.setAttribute("class", "edit-task-dialog-row");
  button.removeAttribute("class");
  button.textContent = "Apply Changes";
  
  document.querySelector("#edit-task-dialog > form").append(div.cloneNode(true));
  document.querySelector("#edit-task-dialog > form > div.edit-task-dialog-row:nth-child(3)").append(button.cloneNode(true));

  



  dialog.id = "delete-task-dialog";
    body.appendChild(dialog.cloneNode(true));
  
    document.querySelector("#delete-task-dialog").append(form.cloneNode(true));
    
    div.textContent = "";
    div.className = "delete-task-dialog-row";
    document.querySelector("#delete-task-dialog > form").append(div.cloneNode(true));
  
    button.className = "close-dialog";
    button.textContent = "";
    document.querySelector("#delete-task-dialog > form > div.delete-task-dialog-row").append(button.cloneNode(true));
  
    image.src = windowClose;
    document.querySelector("#delete-task-dialog > form > div.delete-task-dialog-row > button").append(image.cloneNode(true));
  
    div.className = "delete-task-dialog-row form-content";
    document.querySelector("#delete-task-dialog > form").append(div.cloneNode(true));
  
    div.removeAttribute('class');
    div.innerHTML = "Are you sure you wish to delete this task? <br> This action is irreversible.";
  
    document.querySelector("#delete-task-dialog > form > div.delete-task-dialog-row.form-content").append(div.cloneNode(true));
  
    div.setAttribute("class", "delete-task-dialog-row");
    div.innerHTML ='';
    button.removeAttribute("class");
    button.textContent = "Delete Task";
    
    document.querySelector("#delete-task-dialog > form").append(div.cloneNode(true));
    document.querySelector("#delete-task-dialog > form >div.delete-task-dialog-row:nth-child(3)").append(button.cloneNode(true));
}

export {renderTasks}