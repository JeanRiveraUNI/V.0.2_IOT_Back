const {v4: uuid} = require('uuid');
const Task = require('../database/Task');

const getAllTasks = () => {
    const allTasks = Task.getAllTasks();
    return allTasks;
};

module.exports = {
    getAllTasks,
};
