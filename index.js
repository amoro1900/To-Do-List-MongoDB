const dotenv = require('dotenv');
dotenv.config();


// ------- MongoDB ------- //
const TodoTask = require("./models/TodoTask"); // Format dels documents a la col·lecció TodoTask
const mongoose = require('mongoose');

const userName = process.env.USER_NAME
const userPass = process.env.USER_PASSWORD
const dbIp = process.env.DB_IP
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbAuth = process.env.DB_AUTH

const DB_CONNECT = `mongodb://${userName}:${userPass}@${dbIp}:${dbPort}/${dbName}?authSource=${dbAuth}`

const connectionConfig = {
  socketTimeoutMS: 0,
  connectTimeoutMS: 1000, // Timeout per a la connexió en mil·lisegons (5 segons)
  serverSelectionTimeoutMS: 1000
}

mongoose.connect(DB_CONNECT, connectionConfig)
  .then(() => console.log('Connectat a MongoDB!'))
  .catch((e) => console.error('No s\'ha pogut connectar a MongoDB!. Error: ', e));




// ------- Server ExpressJS ------- //
const express = require("express");
const app = express();


app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(async (req, res, next) => {
  console.log('[' + new Date().toUTCString() + '] - ' + req.method + ' ' + req.url)
  next()
})

//INSERT
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  });
  try {
    console.log('Desant Tasca: ', req.body.content);
    await todoTask.save(); // save = insert
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

// FIND
app.get("/", async (req, res) => {
  try {
    console.log('Carregant tasques de mongodb...');
    const tasks = await TodoTask.find({})
    console.log('Nombre de tasques trobades: ', tasks.length);
    res.render("todo.ejs", { todoTasks: tasks });
  } catch (e) {
    console.error('Alguna cosa ha fallat en llegir les TodoTask guardades... Error: ', e)
  }
});

//UPDATE
app
  .route("/edit/:id").get(async (req, res) => {
    const id = req.params.id;
    const tasks = await TodoTask.find({})
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      console.log('Editant tasca: ', req.params.id);
      const tasks = await TodoTask.findByIdAndUpdate(id, { content: req.body.content })
      res.redirect("/");
    } catch (e) {
      return res.status(500).send(e);
    }
  });

//DELETE
app.route("/remove/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    console.log('Esborrant tasca: ', id);
    const task = await TodoTask.findById(id)
    await task.deleteOne()
    res.redirect("/");
  } catch (e) {
    return res.status(500).send(e);
  }
});


const server = app.listen(8080, () => console.log("Server Up and running at http://localhost:8080"));


process.on('SIGINT', () => {
  console.log('Apagant l\'aplicació...');
  server.close(() => {
    console.log('Servidor tancat-se...')
    process.exit(0)
    });
  });    