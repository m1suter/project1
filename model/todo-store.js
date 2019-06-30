class TodoStore {
    constructor(database) {
        this.db = database;
    }

    async getTodos(sortBy = finishDate, showDone = true) {
        return await this.db
            .find({$where: () => {
                if(showDone) {
                    return this.done != null;
                }
                return true;
            }})
            .sort({[sortBy]:1})
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