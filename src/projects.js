class Task {
  constructor(title, content, created, edited, dueDate, priority, isDone) {
    this.title = title;
    this.content = content;
    this.created = created;
    this.edited = edited;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isDone = isDone
  }
}

class Project {
  constructor(title, created, edited, taskList) {
    this.title = title;
    this.created = created;
    this.edited = edited;
    this.taskList = taskList;
    }

    get numberOfTasks() {
      return this.taskList.length
    }

    addTask(task) {
      this.taskList.push(task);
    }
  }

const firstProject = new Project(
  'My First Project',
  Date().substring(4, 21),
  Date().substring(4, 21),
  []
)

const firstTask = new Task(
  "Task No. 1",
  "A low priority task",
  Date().substring(4, 21),
  Date().substring(4, 21),
  'Dec 25 2025 00:00',
  "low",
  false
)

const secondTask = new Task(
  "Task No. 2",
  "A medium priority task",
  Date().substring(4, 21),
  Date().substring(4, 21),
  'Dec 25 2025 00:00',
  "medium",
  false
)

const thirdTask = new Task(
  "Task No. 3",
  "A high priority task",
  Date().substring(4, 21),
  Date().substring(4, 21),
  'Dec 25 2025 00:00',
  "high",
  false
)

const fourthTask = new Task(
  "Task No. 4",
  "A Completed Task",
  Date().substring(4, 21),
  Date().substring(4, 21),
  'Dec 25 2025 00:00',
  "medium",
  true
)

firstProject.addTask(firstTask);
firstProject.addTask(secondTask);
firstProject.addTask(thirdTask);
firstProject.addTask(fourthTask);

export {Task, Project, firstProject}