export default function renderProjectTitle(project) {
    const title = document.createElement("h2");
    title.textContent = project.name;
    return title;
}
