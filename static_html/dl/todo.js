const parseDate = date => {
    if (!date) {
        return null;
    }

    const parsedDate = Date.parse(date);

    return isNaN(parsedDate)?
        null
        :new Date(parsedDate);
}

export class Todo {
    constructor() {
        this.created = new Date();
        this.title = '';
        this.description = '';
        this.done = false;
        this.doneDate = null;
        this.due = new Date();
        this.priority = 3;
    }

    setId(id) {
        if(typeof id != null) {
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
        if(typeof done === 'string') {
            this.done = done === 'true'?true:false;
        }
    }

    setDoneDate(doneDate) {
        if(typeof doneDate !== 'undefined') {
            this.doneDate = parseDate(doneDate);
        }
    }

    setDueDate(due) {
        if(typeof due !== 'undefined') {
            this.due = parseDate(due);
        }
    }

    setPriority(priority) {
        if(priority != null) {
            this.priority = priority;
        }
    }

    static fromDB(dbRecord) {
        let todo = new Todo();
        todo.setId(dbRecord._id);
        todo.setCreated(dbRecord.created);
        todo.setTitle(dbRecord.title);
        todo.setDescription(dbRecord.description);
        todo.setDone(dbRecord.done);
        todo.setDoneDate(dbRecord.doneDate);
        todo.setDueDate(dbRecord.due);
        todo.setPriority(dbRecord.priority);
        return todo;
    }

    static fromJson(raw) {
        const todo = new Todo();
        todo.setId(raw.id);
        todo.setCreated(raw.created);
        todo.setTitle(raw.title);
        todo.setDescription(raw.description);
        todo.setDone(raw.done);
        todo.setDoneDate(raw.doneDate);
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
            'done': Boolean(this.done),
            'doneDate':this.doneDate,
            'due': this.due,
            'priority': this.priority
        };
    }
}