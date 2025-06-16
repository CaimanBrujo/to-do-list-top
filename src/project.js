function createProject(name) {
    return {
        name,
        todos: [],
        addTodo(todo) {
        this.todos.push(todo);
        },
        removeTodo(index) {
        this.todos.splice(index, 1);
        },
    };
}

export default createProject;
