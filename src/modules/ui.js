import ProjectManager from "./projectManager";
import renderApp from "./renderApp";

function renderProject(project) {
    const container = document.createElement("div");
    container.classList.add("project");

    const title = document.createElement("h2");
    title.textContent = project.name;
    container.appendChild(title);

    const list = document.createElement("ul");

    project.todos.forEach((todo) => {
        const item = document.createElement("li");
        item.textContent = `${todo.title} (${todo.dueDate})`;
        list.appendChild(item);
    });

    container.appendChild(list);
    return container;
}

function renderProjectList(projects) {
    const container = document.createElement("aside");
    container.classList.add("project-list");

    const title = document.createElement("h2");
    title.textContent = "Projects";
    container.appendChild(title);

    const list = document.createElement("ul");

    projects.forEach((project) => {
        const item = document.createElement("li");
        item.textContent = project.name;
        item.dataset.projectName = project.name;
        item.classList.add("project-item");

        list.appendChild(item);
    });

    container.appendChild(list);
    return container;
}

function renderProjectFormSection() {
    const section = document.createElement("section");
    section.classList.add("project-form-section");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Add Project";
    toggleBtn.classList.add("toggle-project-form");

    const projectForm = document.createElement("form");
    projectForm.classList.add("new-project-form");
    projectForm.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "New project name";
    input.required = true;

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Create";

    projectForm.appendChild(input);
    projectForm.appendChild(submitBtn);

    toggleBtn.addEventListener("click", () => {
        projectForm.style.display = projectForm.style.display === "none" ? "block" : "none";
        input.focus();
    });

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projectName = input.value.trim();
        if (projectName) {
            ProjectManager.addProject(projectName);
            input.value = "";
            projectForm.style.display = "none";
            renderApp();
        }
    });

    section.appendChild(toggleBtn);
    section.appendChild(projectForm);

    return section;
}

export { renderProject, renderProjectList, renderProjectFormSection };


