const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// función para leer tareas
const getTasksFromFile = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// función para guardar tareas
const saveTasksToFile = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// GET /tasks
exports.getTasks = (req, res) => {
  const tasks = getTasksFromFile();

  res.status(200).json({
    ok: true,
    data: tasks
  });
};

// GET /tasks/:id
exports.getTaskById = (req, res) => {

  const tasks = getTasksFromFile();
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      ok: false,
      error: "Task not found"
    });
  }

  res.status(200).json({
    ok: true,
    data: task
  });
};

// POST /tasks
exports.createTask = (req, res) => {

  const tasks = getTasksFromFile();

  const { title, description, done } = req.body;

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    done: done ?? false,
    createdAt: new Date()
  };

  tasks.push(newTask);

  saveTasksToFile(tasks);

  res.status(201).json({
    ok: true,
    data: newTask
  });
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {

  const tasks = getTasksFromFile();
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      error: "Task not found"
    });
  }

  const { title, description, done } = req.body;

  if (title !== undefined) tasks[index].title = title;
  if (description !== undefined) tasks[index].description = description;
  if (done !== undefined) tasks[index].done = done;

  saveTasksToFile(tasks);

  res.status(200).json({
    ok: true,
    data: tasks[index]
  });
};

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {

  const tasks = getTasksFromFile();
  const id = parseInt(req.params.id);

  const newTasks = tasks.filter(t => t.id !== id);

  if (tasks.length === newTasks.length) {
    return res.status(404).json({
      ok: false,
      error: "Task not found"
    });
  }

  saveTasksToFile(newTasks);

  res.status(204).send();
};