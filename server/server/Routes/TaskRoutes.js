const { CreateTask, UpdateTask, DelelteTask, ShowAllAssigned, ShowAllTask, ShowOneTask } = require('../Apis/Task/TaskController')
const router = require('express').Router()

router.post("/add", CreateTask)
router.post("/update", UpdateTask)
router.post("/remove/:id", DelelteTask)
router.get("/showAssigned/:id", ShowAllAssigned)
router.get("/showAll", ShowAllTask)
router.post("/show", ShowOneTask)



module.exports = router