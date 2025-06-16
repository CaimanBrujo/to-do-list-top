import "./style.css";
import logo from "./assets/images/logo-js.svg";
import createTodo from "./todo";
import createProject from "./project";
import ProjectManager from "./projectManager";


const img = document.createElement("img");
img.src = logo;
img.alt = "Logo";
img.width = 150;
document.body.appendChild(img);


// TEST todo.js and project.js
const testProject = createProject("Personal");

const todo1 = createTodo("Buy groceries", "Milk, bread, eggs", "2025-06-20", "high");
const todo2 = createTodo("Workout", "Leg day at the gym", "2025-06-21", "medium");

testProject.addTodo(todo1);
testProject.addTodo(todo2);

console.log("Project name:", testProject.name);
console.table(testProject.todos);


// TEST projectManager.js
ProjectManager.addProject("Personal");
ProjectManager.addProject("Work");

ProjectManager.setCurrentProject("Work");

const current = ProjectManager.getCurrentProject();
console.log("Current Project:", current);

console.log("All Projects:");
console.table(ProjectManager.getProjects());
