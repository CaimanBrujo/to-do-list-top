import ProjectManager from "../projectManager";
import renderApp from "../renderApp";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function renderTodoList(project) {
    const list = document.createElement("ul");
    list.classList.add("todo-list");

    project.todos.forEach((todo, index) => {
        const item = document.createElement("li");
        item.classList.add("todo-item");

        const content = document.createElement("div");
        content.classList.add("todo-content");

        const text = document.createElement("span");
        text.classList.add("todo-title");
        const distance = formatDistanceToNow(parseISO(todo.dueDate), { addSuffix: true });
        text.textContent = `${todo.title} (${distance})`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit-todo-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-todo-btn");

        deleteBtn.addEventListener("click", () => {
            const current = ProjectManager.getCurrentProject();
            current.removeTodo(index);
            renderApp();
        });

        editBtn.addEventListener("click", () => {
            if (item.querySelector("form")) return;

            const form = document.createElement("form");
            form.classList.add("edit-todo-form");

            const inputTitle = document.createElement("input");
            inputTitle.type = "text";
            inputTitle.value = todo.title;
            inputTitle.classList.add("edit-todo-title");

            const inputDesc = document.createElement("input");
            inputDesc.type = "text";
            inputDesc.value = todo.description;
            inputDesc.classList.add("edit-todo-desc");

            const inputDate = document.createElement("input");
            inputDate.type = "date";
            inputDate.value = todo.dueDate;
            inputDate.classList.add("edit-todo-date");

            const selectPriority = document.createElement("select");
            selectPriority.classList.add("edit-todo-priority");
            ["low", "medium", "high"].forEach(level => {
                const option = document.createElement("option");
                option.value = level;
                option.textContent = level;
                if (level === todo.priority) option.selected = true;
                selectPriority.appendChild(option);
            });

            form.appendChild(inputTitle);
            form.appendChild(inputDesc);
            form.appendChild(inputDate);
            form.appendChild(selectPriority);

            const save = () => {
                const newTitle = inputTitle.value.trim();
                const newDesc = inputDesc.value.trim();
                const newDate = inputDate.value;
                const newPriority = selectPriority.value;

                if (newTitle && newDate) {
                    todo.title = newTitle;
                    todo.description = newDesc;
                    todo.dueDate = newDate;
                    todo.priority = newPriority;
                    renderApp();
                }
            };

            form.addEventListener("submit", (e) => {
                e.preventDefault();
                save();
            });

            form.addEventListener("focusout", (e) => {
                if (!form.contains(e.relatedTarget)) {
                    save();
                }
            });

            item.replaceChild(form, content);
            inputTitle.focus();
        });

        content.appendChild(text);
        content.appendChild(editBtn);
        content.appendChild(deleteBtn);
        item.appendChild(content);
        list.appendChild(item);
    });

    return list;
}
