const Task = require("../models/task");
const express = require("express");
const router = express.Router();

// Create a new task
router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

// Get all tasks with CI/CD test message
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        // Add a test message for CI/CD verification
        res.send({ message: "CI/CD test successful!", tasks });
    } catch (error) {
        res.send(error);
    }
});

// Update a task by ID
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true } // return the updated task
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

// Delete a task by ID
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
