import ProjectManager from "../projectManager";
import renderApp from "../renderApp";
import createTodo from "../todo";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function renderProject(project) {
    const container = document.createElement("div");
    container.classList.add("project");

    const title = document.createElement("h2");
    title.textContent = project.name;
    container.appendChild(title);

    const list = document.createElement("ul");

    project.todos.forEach((todo) => {
        const item = document.createElement("li");
        const distance = formatDistanceToNow(parseISO(todo.dueDate), { addSuffix: true });
        item.textContent = `${todo.title} (${distance})`;
        list.appendChild(item);
    });

    container.appendChild(list);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "Add To-Do";
    addTodoBtn.classList.add("add-todo-btn");
    container.appendChild(addTodoBtn);

    const todoForm = document.createElement("form");
    todoForm.style.display = "none";
    todoForm.classList.add("todo-form");

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.placeholder = "Title";
    inputTitle.required = true;

    const inputDesc = document.createElement("input");
    inputDesc.type = "text";
    inputDesc.placeholder = "Description";

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.required = true;

    const selectPriority = document.createElement("select");
    ["low", "medium", "high"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        selectPriority.appendChild(option);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Create";

    todoForm.appendChild(inputTitle);
    todoForm.appendChild(inputDesc);
    todoForm.appendChild(inputDate);
    todoForm.appendChild(selectPriority);
    todoForm.appendChild(submitBtn);

    container.appendChild(todoForm);

    addTodoBtn.addEventListener("click", () => {
        todoForm.style.display = todoForm.style.display === "none" ? "block" : "none";
        inputTitle.focus();
    });

    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = inputTitle.value.trim();
        const desc = inputDesc.value.trim();
        const date = inputDate.value;
        const priority = selectPriority.value;

        if (title && date) {
            const newTodo = createTodo(title, desc, date, priority);
            project.addTodo(newTodo);
            renderApp();
        }
    });

    return container;
}
