import { Todo } from "../dl/todo.js";

export class NewTodoController {
    constructor(todoService) {
        this.todoService = todoService;
        this.todo = new Todo();
        this.id = new URLSearchParams(window.location.search).get("id");
        
        this.container = document.getElementById("new-todo-container");
        this.newTodoTemplateCompiled = Handlebars.compile(document.getElementById("new-todo-template").innerHTML);
    }

    initEventListener() {
        this.container.querySelector('form').addEventListener('submit', event => this._formSubmitHandler(event));
        this.container.querySelector('form').addEventListener('reset', event => {
            event.preventDefault();
            window.location = 'index.html';
        });
    }

    renderView() {
        let prios = [];
        [1,2,3,4,5].forEach(index => prios.push({priority:Number(this.todo.priority), value:index}));
        this.container.innerHTML = this.newTodoTemplateCompiled({"todo": this.todo, "prios":prios});
        this.initEventListener();
    }

    loadTodo() {
        if(this.id != null) {
            this.todoService.loadTodo(this.id);
            this.todo = Todo.fromJson(this.todoService.todo);
        } else {
            this.todo = new Todo();
        }
        this.renderView();
    }

    _formSubmitHandler(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        for(let pair of formData) {
            if(pair[0] == "due") {
                this.todo[pair[0]] = new Date(pair[1]);
            } else {
                this.todo[pair[0]] = pair[1];
            }
        }
        if(this.id == null) {
            this.todoService.addTodo(this.todo);
        } else {
            this.todoService.updateTodo(this.todo);
        }

        window.location = 'index.html';
    }

    init() {
        this.loadTodo();
    }
}