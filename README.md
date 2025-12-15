# todo-list

---

Sent in as a submission for [Project: Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

---

The goal of this project was to create a basic todo list application dynamically with JavaScript. Here are some details of the implementation:

- Projects, as well as tasks (a project property themselves), were created using the class constructor.
- There is no backend, and the browser's `localStorage` is used to store project data in JSON format.
- When needed, projects were converted from JSON back into JavaScript objects, and their corresponding methods were subsequently re-added with the `Object.defineProperty` method.
- The code was modularized as follows:
  - `projects.js` creates project and task classes and exports instances of them that will be used to initialize the application.
  - `index.js` handles the logic of the application. If the `localStorage` is empty, it populates it with the default instances from `projects.js`. Otherwise, it renders the homepage with the user's projects.
  - `homeDOM.js` populates the homepage's HTML dynamically.
  - `taskDOM.js` populates a project's HTML dynamically.
  - `eventListeners.js` contains every event handler.
- Dates were created by selecting a desired substring from the built-in `Date()` function.
