import { renderProject, renderProjectList } from "./ui";
import ProjectManager from "./projectManager";

export default function renderApp() {
    document.body.innerHTML = "";
    document.body.appendChild(renderProjectList(ProjectManager.getProjects()));
    document.body.appendChild(renderProject(ProjectManager.getCurrentProject()));
}
