const asyncWrapper = require('../utils/asyncWrapper')
const httpStatusCode = require('../constants/httpStatusCode')
const AppError = require('../errors/AppError')
const taskService = require('../services/taskService')

const getAllTasks = asyncWrapper(async(req, res)=>{
    const tasks = await taskService.getAllTasks()
    res.status(httpStatusCode.OK).send({status: "OK", data: tasks})
}
)
const getSingleTask = asyncWrapper(async(req, res)=>{
    const task = await taskService.getSingleTask(req.params.taskId)
    res.status(httpStatusCode.OK).send(
        {status: "Ok", data: task}
    )
})
const createTask = asyncWrapper(async(req, res)=>{
    const {body} = req
    if (!body.name){
        throw new AppError(
            'missing_key', 
            'one of the following key is missing', 
            httpStatusCode.BAD_REQUEST
        )
    }
    const createdTask = await taskService.createTask(body)
    res.status(httpStatusCode.CREATED).send({status: "Ok", data: createdTask})
})
    
const updateTask = asyncWrapper(async(req, res)=>{
    await taskService.updateTask(req.params.taskId, req.body)
    res.status(httpStatusCode.OK).send({status: "OK"})
}
)
const deleteTask = asyncWrapper(async (req, res)=>{
    await taskService.deleteTask(req.params.taskId)
    res.status(httpStatusCode.OK).send({status: "Ok"})
})


module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}