export class NewTodoService {
    constructor(todoStore) {
        this.todoStore = todoStore;
        this.todo = {};
    }

    loadTodo(id) {
        this.todo = this.todoStore.getTodo(id);
    }

    addTodo(todo) {
        this.todoStore.addTodo(todo);
    }

    updateTodo(todo) {
        this.todoStore.updateTodo(todo);
    }
}