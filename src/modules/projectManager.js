import createProject from "./project";

const ProjectManager = (function () {
    const projects = [];
    let currentProject = null;

    function addProject(name) {
        const project = createProject(name);
        projects.push(project);
        if (!currentProject) currentProject = project;
        return project;
    }

    function getProjects() {
        return projects;
    }

    function getCurrentProject() {
        return currentProject;
    }

    function setCurrentProject(name) {
        const found = projects.find((project) => project.name === name);
        if (found) currentProject = found;
    }

    return {
        addProject,
        getProjects,
        getCurrentProject,
        setCurrentProject,
    };
})();

export default ProjectManager;
