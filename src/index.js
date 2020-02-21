const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();


const port = process.env.port || 4444;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port 4444.");
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5e4ff69dd4550004c013a97e");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);

  const user = await User.findById("5e4ff694d4550004c013a97c");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();