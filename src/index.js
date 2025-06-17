import "./style.css";
import logo from "./assets/images/logo-js.svg";
import createTodo from "./modules/todo";
import createProject from "./modules/project";
import ProjectManager from "./modules/projectManager";
import { renderProject, renderProjectList } from "./modules/ui";


const img = document.createElement("img");
img.src = logo;
img.alt = "Logo";
img.width = 150;
document.body.appendChild(img);



// TEST projectManager.js
ProjectManager.addProject("Personal");
ProjectManager.addProject("Work");

// TEST todo.js
const todo1 = createTodo("Buy groceries", "Milk, bread, eggs", "2025-06-20", "high");
const todo2 = createTodo("Workout", "Leg day at the gym", "2025-06-21", "medium");

// TEST work project
const workProject = ProjectManager.getProjects().find(p => p.name === "Work");
workProject.addTodo(todo1);
workProject.addTodo(todo2);

ProjectManager.setCurrentProject("Work");

// UI
const projectListEl = renderProjectList(ProjectManager.getProjects());

document.body.innerHTML = "";
document.body.appendChild(projectListEl);
document.body.appendChild(renderProject(ProjectManager.getCurrentProject()));
