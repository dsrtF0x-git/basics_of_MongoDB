const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.get("/tasks", auth, async (req, res) => {
	try {
		await req.user.populate("tasks").execPopulate();
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send(e);
	}
	
	// Task.find({}).then(tasks => {
	// 	res.send(tasks);
	// }).catch(e => {
	// 	res.status(500).send(e);
	// });
});

router.get("/tasks/:id", auth,  async (req, res) => {
	const _id = req.params.id;
	try {
		// const task = await Task.findById(_id);
		const task = await Task.findOne({ _id, owner: req.user._id });
			if (!task) {
				res.status(404).send();
			}
	
			res.send(task);
	} catch (error) {
		res.status(500).send();
	}
	// Task.findById(_id).then(task => {
	// 	if (!task) {
	// 		return res.status(404).send();
	// 	}

	// 	res.send(task);
	// }).catch(error => {
	// 	res.status(500).send();
	// });
});

router.patch("/tasks/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValidOperation = updates.every(item => allowedUpdates.includes(item));

	if (!isValidOperation) return res.status(400).send({ error: "Invalid updates!"});

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });		
		
		// const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		if (!task) return res.status(404).send();

		updates.forEach(item => {
			task[item] = req.body[item];
		});

		await task.save();
		res.send(task);
		
	} catch (error) {
		res.status(404).send(error);
	}

});

router.post("/tasks", auth, async (req, res) => {
	// const task = new Task(req.body);

	const task = new Task({
		...req.body,
		owner: req.user._id
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete("/tasks/:id", auth, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
		// const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) return res.status(404).send();

		res.send(task);

	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;