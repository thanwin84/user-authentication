const task = require('../database/Task')

const getAllTasks = ()=>{
    try {
        const tasks = task.getAllTasks()
        return tasks
    } catch (error) {
        throw error
        
    }
}
const getSingleTask = (taskId)=>{
    try {
        const result = task.getSingleTask(taskId)
        return result
    } catch (error) {
        throw error
        
    }
}
const createTask = (taskBody)=>{
    try {
        const createdTask = task.createTask(taskBody)
        return createdTask
    } catch (error) {
        throw error
        
    }
}
const updateTask = (taskId, taskBody)=>{
    try {
       task.updateTask(taskId, taskBody)
    } catch (error) {
        throw error
        
    }
}
const deleteTask = (taskId)=>{
    try {
        return task.deleteTask(taskId)
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