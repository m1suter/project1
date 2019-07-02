export class TodoService {
    constructor(todoStore) {
        this.todoStore = todoStore;
        this.todos = [];
    }

    loadTodos(filterId, showFinished) {
        this.todos = this.todoStore.getTodos(filterId, showFinished);
    }

    loadData() {
        this.loadTodos("created", true);
    }

    updateTodo(todo) {
        this.todoStore.updateTodo(todo);
    }

    getTodo(id) {
        return this.todoStore.getTodo(id);
    }
}