import ProjectManager from "../projectManager";
import renderApp from "../renderApp";
import renderProjectTitle from "./renderProjectTitle";
import renderTodoList from "./renderTodoList";
import renderAddTodoForm from "./renderAddTodoForm";

export default function renderProject(project) {
    const container = document.createElement("div");
    container.classList.add("project");

    const title = renderProjectTitle(project);
    const list = renderTodoList(project);
    const { form, toggleButton } = renderAddTodoForm(project);

    container.appendChild(title);
    container.appendChild(list);
    container.appendChild(toggleButton);
    container.appendChild(form);

    return container;
}
