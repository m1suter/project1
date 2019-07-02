import {TodolistController} from './ui/todolist-constroller.js';
import {TodoService} from './bl/todo-service.js';
import {RestTodoStore} from './dl/rest-todo-store.js';


class Bootstrapper {
    static start() {
        const restTodoStore = new RestTodoStore();
        const todoService = new TodoService(restTodoStore);
        new TodolistController(todoService).init();
    }
}

document.addEventListener('DOMContentLoaded', Bootstrapper.start);