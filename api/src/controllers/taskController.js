const taskService = require('../services/taskService');

const getAllTasks = (req, res) => {
    const allTasks = taskService.getAllTasks();
    res.send({status: 'OK', data: allTasks});
}

module.exports = {
    getAllTasks,
};

