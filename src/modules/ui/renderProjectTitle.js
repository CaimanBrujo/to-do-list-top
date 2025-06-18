import ProjectManager from "../projectManager";
import renderApp from "../renderApp";

export default function renderProjectTitle(project) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("project-title-wrapper");

    const title = document.createElement("h2");
    title.classList.add("project-title")
    title.textContent = project.name;
    wrapper.appendChild(title);

    const projectEditBtn = document.createElement("button");
    projectEditBtn.textContent = "✏️";
    projectEditBtn.classList.add("edit-title-btn");
    wrapper.appendChild(projectEditBtn);

    projectEditBtn.addEventListener("click", () => {
        if (wrapper.querySelector("input")) return;

        const input = document.createElement("input");
        input.type = "text";
        input.value = project.name;
        input.classList.add("edit-title-input");

        wrapper.replaceChild(input, title);
        input.focus();

        const finishEdit = () => {
            const newName = input.value.trim();
            if (newName && newName !== project.name) {
                project.name = newName;
            }
            renderApp();
        };

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") finishEdit();
        });

        input.addEventListener("blur", finishEdit);
    });

    return wrapper;
}
