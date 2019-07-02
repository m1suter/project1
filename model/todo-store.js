class TodoStore {
    constructor(database) {
        this.db = database;
    }

    async getTodos(sortBy = finishDate, showDone = true) {
        if(showDone) {
            return await this.db
            .find({})
            .sort({[sortBy]:-1})
            .exec();
        }
        return await this.db
            .find({ $where: function() { return this.done === false} })
            .sort({[sortBy]:-1})
            .exec();
    }

    async createTodo(newTodo) {
        return await this.db.insert(newTodo);
    }

    async getTodo(id) {
        return await this.db.findOne({_id: id})
    }

    async updateTodo(id, todo) {
        await this.db.update({_id: id}, {$set: todo});
    }

}

module.exports = TodoStore;