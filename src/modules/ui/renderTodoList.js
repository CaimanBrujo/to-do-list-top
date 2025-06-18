import ProjectManager from "../projectManager";
import renderApp from "../renderApp";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function renderTodoList(project) {
    const list = document.createElement("ul");

    project.todos.forEach((todo, index) => {
        const item = document.createElement("li");

        const text = document.createElement("span");
        const distance = formatDistanceToNow(parseISO(todo.dueDate), { addSuffix: true });
        text.textContent = `${todo.title} (${distance})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => {
            const current = ProjectManager.getCurrentProject();
            current.removeTodo(index);
            renderApp();
        });

        item.appendChild(text);
        item.appendChild(deleteBtn);
        list.appendChild(item);
    });

    return list;
}
