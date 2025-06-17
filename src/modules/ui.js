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

export { renderProject };
