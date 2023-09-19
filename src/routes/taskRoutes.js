const router = require("express").Router();

const Task = require("../models/Task");

router.post("/", async (req, res) => {
  // req.body
  const { name, description, taskDone } = req.body;

  const task = {
    name,
    description,
    taskDone,
  };

  try {
    await Task.create(task);

    res.status(201).json({ message: "Task inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const tasks = await Task.findOne({ _id: id });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

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
    const updatedTask = await Task.updateOne({ _id: id }, task);

    if (updatedTask.matchedCount === 0) {
      res.status(422).json({ message: "A task não foi encontrado" });
      return;
    }

    res.status(201).json({ message: "Task alterada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(422).json({ message: "ID da task invalida" });
  }

  try {
    const task = await Task.findOne({ _id: id });

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
});

module.exports = router;
