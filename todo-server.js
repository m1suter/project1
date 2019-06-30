const
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    Datastore = require('nedb-promises'),
    TodoController = require('./controller/todo-controller.js'),
    TodoStore = require('./model/todo-store.js'),
    todoRoutes = require('./routes/todo-routes.js'),
    app = express();



app.use(morgan('dev'));

app.use(express.static(__dirname + 'node_modules'));
app.use(express.static(__dirname + '/static_html'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const db = Datastore.create({filename: 'db/todo.db', autoload: true});
const todoStore = new TodoStore(db);
const todoController = new TodoController(todoStore);
app.use('/', todoRoutes(todoController));

app.listen(3000, function() {
    console.log("listening on port 3000...");
})