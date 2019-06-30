const Todo = require('../model/todo.js');

class TodoController {
    constructor(todoStore) {
        this.todoStore = todoStore;
    }

    async getTodos(req, res) {
        let sortBy = req.query.sortBy || 'due';
        let showDone = req.query.showDone === 'true';

        res.json(await Array.from(await this.todoStore.getTodos(sortBy, showDone))
                        .map(dbRecord => Todo.fromDB(dbRecord)));
    }

    async createTodo(req, res) {
        const newTodo = await Todo.fromDB(await this.todoStore.createTodo(req.body));
        
        res.json(newTodo);
    }

    async getTodo(req, res) {
        let id = req.params.id;

        res.json(await Todo.fromDB(await this.todoStore.getTodo(id)));
    }

    async updateTodo(req, res) {
        let id = req.params.id;
        let body = Todo.fromJson(req.body);

        res.json(await this.todoStore.updateTodo(id, body));
    }
}

module.exports = TodoController;