import { Todo } from "../dl/todo.js";

export class TodolistController {
    constructor(todoService) {
        this.todoService = todoService;
        this.filterId = "due";
        this.showFinished = true;

       this.todolistTemplateCompiled = Handlebars.compile(document.getElementById('todolist_template').innerHTML);

        this.todolistSection = document.getElementById('todolist');
        this.todolistContainer = document.getElementById('todolist-container');
    }

    renderTodoList() {
        this.todolistSection.innerHTML = this.todolistTemplateCompiled({todos : this.todoService.todos});
    }

    showTodos() {
        this.todoService.loadTodos(this.filterId, this.showFinished);
        this.renderTodoList();
    }

    initEventHandlers() {
        this.todolistContainer.addEventListener('click', (event) => {
            this.filterId = event.target.dataset.filter;
            if(this.filterId != null) {
                this.showTodos();
            }
        });

        this.todolistContainer.addEventListener('click', (event) => {
            const finished = event.target.dataset.showFinished;
            if(typeof finished !== 'undefined') {
                this.showFinished = !this.showFinished;
                this.showTodos();
            }
        });

        this.todolistContainer.addEventListener('click', (event) => {
            const link = event.target.dataset.new;
            if(typeof link !== 'undefined') {
                window.location.href = link;
            }
        });

        this.todolistContainer.addEventListener('click', (event) => {
            const finish = event.target.dataset.finishTask;
            if(typeof finish !== 'undefined') {
                let value = event.target.checked;
                let todo = Todo.fromJson(this.todoService.getTodo(finish));
                todo.setDone(value);
                todo.setDoneDate(value?new Date():null);
                this.todoService.updateTodo(todo);
                this.showTodos();
            }
        });

        document.getElementById("theme").addEventListener('change', (event) => {
            const newTheme = event.target.value;
            if(typeof newTheme !== 'undefined') {
                const themes = Array.from(document.querySelectorAll('link'));
                for(let theme of themes) {
                    theme.disabled = true;
                    if(theme.title === newTheme) {
                        theme.disabled = false;
                    }
                }
            }
        });
    }

    init() {
        this.initEventHandlers();
        this.todoService.loadData();
        this.renderTodoList();
    }
}