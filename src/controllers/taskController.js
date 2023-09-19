const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { name, description, taskDone } = req.body;
  const createdBy = req.user.id

  if(!name) {
    res.status(422).json({error: 'o nome é obrigatorio!'})
    return
  }
  if(!description) {
    res.status(422).json({error: 'a descrição é obrigatoria!'})
    return
  }
  if(!taskDone) {
    res.status(422).json({error: 'o check da task é obrigatorio!'})
    return
  }

  const task = {
    name,
    description,
    taskDone,
    createdBy,
  };

  try {
    await Task.create(task);

    res.status(201).json({ message: "Task inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ createdBy: userId});

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    const tasks = await Task.findOne({ _id: id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(422).json({ message: "ID da task invalida" });
  }

  const { name, description, taskDone } = req.body;

  const task = {
    name,
    description,
    taskDone,
  };

  try {
    const updatedTask = await Task.updateOne({ _id: id, createdBy: userId }, task);

    if (updatedTask.matchedCount === 0) {
      res.status(422).json({ message: "A task não foi encontrado" });
      return;
    }

    res.status(201).json({ message: "Task alterada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(422).json({ message: "ID da task invalida" });
  }

  try {
    const task = await Task.findOne({ _id: id , createdBy: userId });

    if (!task) {
      return res.status(422).json({ message: "Essa task não foi encontrada" });
    }

    await Task.deleteOne({ _id: id });
    return res.status(200).json({ message: "Task removida com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    return res
      .status(500)
      .json({ error: "Ocorreu um erro interno no servidor" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
