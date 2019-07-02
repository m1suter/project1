import {NewTodoController} from './ui/new-todo-controller.js';
import {NewTodoService} from './bl/new-todo-service.js';
import {RestTodoStore} from './dl/rest-todo-store.js';

class FormBootstrapper {
    static start() {
        const todoStore = new RestTodoStore();
        const todoService = new NewTodoService(todoStore);
        new NewTodoController(todoService).init();
    }
}
document.addEventListener('DOMContentLoaded', FormBootstrapper.start);