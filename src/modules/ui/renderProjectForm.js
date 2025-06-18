import ProjectManager from "../projectManager";
import renderApp from "../renderApp";

export default function renderProjectFormSection() {
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
