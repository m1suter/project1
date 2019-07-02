export class RestTodoStore {
    constructor(){
        $.ajaxSetup({
            async: false
        });
    }

    getTodos(filterId, showDone) {
        let result = [];
        $.ajax({
            dataType:"json",
            url:"todos",
            type:"GET",
            data: {"sortBy":filterId, "showDone":showDone},
            success: function(data) {
                result = data;
            }
        });
        return result;
    }

    getTodo(id) {
        let result = {};
        $.ajax({
            dataType:"json",
            url:"todo/"+id,
            type:"GET",
            success: function(data) {
                result = data;
            }
        });
        return result;
    }

    addTodo(todo) {
        let result = {};
        $.ajax({
            dataType:"json",
            url:"todo",
            type:"POST",
            data: todo,
            success: function(data) {
                result = data;
            }
        });
        return result;
    }

    updateTodo(todo) {
        $.ajax({
            dataType:"json",
            url:"todo/"+todo.id,
            type:"POST",
            data: todo,
            success: function(data) {
            }
        });
    }
}