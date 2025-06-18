import { renderProject, renderProjectList, renderProjectFormSection } from "./ui";
import ProjectManager from "./projectManager";

export default function renderApp() {
    document.body.innerHTML = "";

    document.body.appendChild(renderProjectFormSection());

    const sidebar = renderProjectList(ProjectManager.getProjects());
    sidebar.classList.add("project-list");

    const main = document.createElement("main");
    main.classList.add("project");

    const current = ProjectManager.getCurrentProject();

    if (current) {
        main.appendChild(renderProject(current));
    } else {
        const message = document.createElement("p");
        message.textContent = "No projects yet. Create one to get started!";
        message.classList.add("empty-message");
        main.appendChild(message);
    }

    document.body.appendChild(sidebar);
    document.body.appendChild(main);
}
