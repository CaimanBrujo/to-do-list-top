import createTodo from "../todo";
import renderApp from "../renderApp";

export default function renderAddTodoForm(project) {
    const form = document.createElement("form");
    form.style.display = "none";
    form.classList.add("todo-form");

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

    form.appendChild(inputTitle);
    form.appendChild(inputDesc);
    form.appendChild(inputDate);
    form.appendChild(selectPriority);
    form.appendChild(submitBtn);

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Add To-Do";
    toggleButton.classList.add("add-todo-btn");

    toggleButton.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
        inputTitle.focus();
    });

    form.addEventListener("submit", (e) => {
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

    return { form, toggleButton };
}
