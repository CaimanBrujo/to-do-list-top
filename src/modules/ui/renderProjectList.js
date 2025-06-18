import ProjectManager from "../projectManager";
import renderApp from "../renderApp";

export default function renderProjectList(projects) {
    const container = document.createElement("aside");
    container.classList.add("project-list");

    const title = document.createElement("h2");
    title.textContent = "Projects";
    container.appendChild(title);

    const list = document.createElement("ul");

    projects.forEach((project) => {
        const item = document.createElement("li");
        item.classList.add("project-item");

        // Contenedor del nombre y el botón
        const nameSpan = document.createElement("span");
        nameSpan.textContent = project.name;
        nameSpan.classList.add("project-name");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-project");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            ProjectManager.removeProject(project.name);
            renderApp();
        });

        item.appendChild(nameSpan);
        item.appendChild(deleteBtn);

        // Click para seleccionar proyecto
        item.addEventListener("click", () => {
            ProjectManager.setCurrentProject(project.name);
            renderApp();
        });

        list.appendChild(item);
    });

    container.appendChild(list);
    return container;
}
