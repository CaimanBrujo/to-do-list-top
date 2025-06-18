import ProjectManager from "./projectManager";
import renderApp from "./renderApp";
import createTodo from "./todo";


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

    const projectToggleBtn = document.createElement("button");
    projectToggleBtn.textContent = "Add Project";
    projectToggleBtn.classList.add("toggle-project-form");

    const projectForm = document.createElement("form");
    projectForm.classList.add("new-project-form");
    projectForm.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "New project name";
    input.required = true;

    const projectSubmitBtn = document.createElement("button");
    projectSubmitBtn.type = "submit";
    projectSubmitBtn.textContent = "Create";

    projectForm.appendChild(input);
    projectForm.appendChild(projectSubmitBtn);

    projectToggleBtn.addEventListener("click", () => {
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

    section.appendChild(projectToggleBtn);
    section.appendChild(projectForm);

    return section;
}

export { renderProject, renderProjectList, renderProjectFormSection };


