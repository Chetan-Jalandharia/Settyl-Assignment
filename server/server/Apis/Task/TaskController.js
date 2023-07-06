const Task = require("./TaskModel");


exports.CreateTask = (req, res) => {
    const { title, description, dueDate, assignedTo, assignedBy } = req.body;
    const newTask = new Task()
    newTask.title = title
    newTask.description = description
    newTask.dueDate = dueDate
    newTask.assignedTo = assignedTo
    newTask.assignedBy = assignedBy
    newTask.save()
        .then(val => {
            res.status(200).json({
                success: true,
                message: "Task Created Successfully",
                data: val
            })
        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })

}


exports.UpdateTask = (req, res) => {
    const data = req.body

    Task.findOne({ _id: data.id })
        .then(val => {
            val.title = data?.title ?? val.title
            val.description = data?.description ?? val.description
            val.dueDate = data?.dueDate ?? val.dueDate
            val.currentStatus = data?.currentStatus ?? val.currentStatus
            val.save().then(data => {
                res.status(200).json({
                    success: true,
                    message: "Task Updated Successfully",
                    data: data
                })
            }).catch(err => {
                console.log("error occurs: " + err);
                res.status(400).json({
                    success: false,
                    message: "error occurs: " + err,
                })
            })

        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })

}


exports.DelelteTask = (req, res) => {

    Task.findOne({ _id: req.params.id })
        .then(val => {
            val.status = false
            val.save().then(data => {
                res.status(200).json({
                    success: true,
                    message: "Task Deleted Successfully",
                    data: data
                })
            }).catch(err => {
                console.log("error occurs: " + err);
                res.status(400).json({
                    success: false,
                    message: "error occurs: " + err,
                })
            })

        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })
}


exports.ShowAllTask = (req, res) => {

    Task.find({ status: true })
        .populate('assignedBy')
        .then(data => {

            res.status(200).json({
                success: true,
                message: "Task Fetched Successfully",
                data
            })

        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })
}

exports.ShowAllAssigned = (req, res) => {
    Task.find({ assignedTo: req.params.id, status: true })
        .populate("assignedBy")
        .then(data => {

            res.status(200).json({
                success: true,
                message: "Task Fetched Successfully",
                data
            })

        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })
}

exports.ShowOneTask = (req, res) => {
    Task.findOne({ _id: req.body.taskId })
        .then(data => {
            res.status(200).json({
                success: true,
                message: "Task Fetched Successfully",
                data
            })
        }).catch(err => {
            console.log("error occurs: " + err);
            res.status(400).json({
                success: false,
                message: "error occurs: " + err,
            })
        })
}