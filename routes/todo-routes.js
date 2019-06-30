const
    express = require('express');

const todoRoutes = controller => {
    const router = express.Router();

    router.get('/todos', controller.getTodos.bind(controller));
    router.post('/todo', controller.createTodo.bind(controller));
    router.get('/todo/:id', controller.getTodo.bind(controller));
    router.post('/todo/:id', controller.updateTodo.bind(controller));

    return router;
}

module.exports = todoRoutes;