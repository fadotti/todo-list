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
  }

const firstTask = new Task(
  "Task No. 1",
  "A low priority task",
  Date().substring(4, 21),
  Date().substring(4, 21),
  'Dec 01 2025 00:00',
  "low",
  false
)

const firstProject = new Project(
  'My First Project',
  Date().substring(4, 21),
  Date().substring(4, 21),
  [firstTask]
)

export {firstProject}