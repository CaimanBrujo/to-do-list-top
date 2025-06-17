import "./style.css";
import createTodo from "./modules/todo";
import createProject from "./modules/project";
import ProjectManager from "./modules/projectManager";
import renderApp from "./modules/renderApp";

// TESTING
ProjectManager.addProject("Personal");
ProjectManager.addProject("Work");

const workProject = ProjectManager.getProjects().find(p => p.name === "Work");
workProject.addTodo(createTodo("Buy groceries", "Milk, bread, eggs", "2025-06-20", "high"));
workProject.addTodo(createTodo("Workout", "Leg day at the gym", "2025-06-21", "medium"));

const personalProject = ProjectManager.getProjects().find(p => p.name === "Personal");
personalProject.addTodo(createTodo("Read book", "Finish reading Clean Code", "2025-06-22", "low"));
personalProject.addTodo(createTodo("Call Mom", "Weekly check-in", "2025-06-23", "high"));

ProjectManager.setCurrentProject("Personal");

// Render
renderApp();

// Switch projects on click
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("project-item")) {
        const projectName = e.target.dataset.projectName;
        ProjectManager.setCurrentProject(projectName);
        renderApp();
    }
});
