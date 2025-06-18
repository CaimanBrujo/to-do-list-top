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

    function removeProject(name) {
        const index = projects.findIndex((project) => project.name === name);
        if (index !== -1) {
            const isCurrent = projects[index] === currentProject;
            projects.splice(index, 1);
            if (projects.length === 0) {
                currentProject = null;
            } else if (isCurrent) {
                currentProject = projects[0];
            }
        }
    }

    return {
        addProject,
        getProjects,
        getCurrentProject,
        setCurrentProject,
        removeProject,
    };
})();

export default ProjectManager;
