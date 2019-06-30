const parseDate = date => {
    if (!date) {
        return null;
    }

    const parsedDate = Date.parse(date);

    return isNaN(parsedDate)?
        null
        :new Date(parsedDate);
}

class Todo {
    constructor() {
        this.created = new Date();
        this.title = '';
        this.description = '';
        this.done = null;
        this.due = null;
        this.priority = 3;
    }

    setId(id) {
        if(typeof id === 'number') {
            this.id = id;
        }
    }

    setCreated(created) {
        if(typeof created !== 'undefined') {
            this.created = parseDate(created);
        }
    }

    setTitle(title) {
        if(typeof title === 'string') {
            this.title = title;
        }
    }

    setDescription(description) {
        if(typeof description === 'string') {
            this.description = description;
        }
    }

    setDone(done) {
        if(typeof done === 'boolean') {
            this.done = done;
        }
    }

    setDueDate(due) {
        if(typeof due === 'undefined') {
            this.due = parseDate(due);
        }
    }

    setPriority(priority) {
        if(typeof priority === 'number') {
            this.priority = priority;
        }
    }

    static fromDB(dbRecord) {
        let result = new Todo();
        result.id = dbRecord._id;
        result.created = dbRecord.created;
        result.title = dbRecord.title;
        result.description = dbRecord.description;
        result.done = dbRecord.done;
        result.due = dbRecord.due;
        result.priority = dbRecord.priority;
        return result;
    }

    static fromJson(raw) {
        const todo = new Todo();
        todo.setId(raw.id);
        todo.setCreated(raw.created);
        todo.setTitle(raw.title);
        todo.setDescription(raw.description);
        todo.setDone(raw.done);
        todo.setDueDate(raw.due);
        todo.setPriority(raw.priority);
        return todo;
    }

    toJson() {
        return {
            'id': this.id,
            'created': this.created,
            'title': this.title,
            'description': this.description,
            'done': this.done,
            'due': this.due,
            'priority': this.priority
        };
    }
}

module.exports = Todo;