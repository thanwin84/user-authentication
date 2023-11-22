const Task = require('../models/task')
const httpStatusCode = require('../constants/httpStatusCode')
const AppError = require('../errors/AppError')

const getAllTasks = async()=>{
    try {
        const result = await Task.find()
        return result
    } catch (error) {
        throw error
    }
}
const getSingleTask = async(taskId)=>{
    try {
        const result = await Task.findById(taskId)
        if (!result){
            throw new AppError('INVALID_ID', `no user id with ${taskId}`, httpStatusCode.BAD_REQUEST)
        }
        return result
    } catch (error) {
        throw error
    }
}
const createTask = async(task)=>{
    try {
        const _task = await Task(task)
        await _task.save()
        return _task
    } catch (error) {
        if (error.code){
            throw new AppError(
                'DUPLICATE_NAME', 
                "Trying to insert same item again",
                httpStatusCode.CONFLICT
                )
        }
        throw error
    }
}
const updateTask = async(taskId, updatedTask)=>{
    try {
        const result = await Task.updateOne(
            {_id: taskId},
            {$set: updatedTask}
        )
        if (result.modifiedCount === 0){
            throw new AppError(
                'ID_NOT_FOUND',
                `USER ID ${taskId} is not found`,
                httpStatusCode.BAD_REQUEST
            )
        }
    } catch (error) {
        throw error
    }
}
const deleteTask = async(taskId)=>{
    try {
        const data = await Task.findByIdAndDelete(taskId)
        if (data === null) {
            throw new AppError(
                'ID_NOT_FOUND',
                `USER ID ${taskId} is not found`,
                httpStatusCode.BAD_REQUEST
            )
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}