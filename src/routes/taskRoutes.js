const router = require('express').Router()

const Task = require('../models/Task')


router.post('/', async (req, res) => {

  // req.body
  const {name , description, taskDone} = req.body


  const task = {
    name,
    description,
    taskDone,
  }

  try {
    await Task.create(task)

    res.status(201).json({message: 'Task inserida com sucesso'})

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/', async (req, res) => {
  try {
    const tasks =  await Task.find()

    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {

  const id = req.params.id

  try {
    const tasks =  await Task.findOne({_id: id})

    res.status(200).json(tasks)

  } catch (error) {
    res.status(500).json({ error: error })
  }
})


module.exports = router
