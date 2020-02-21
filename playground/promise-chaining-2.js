require("../src/db/mongoose");

const Task = require("../src/models/task");

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: true });
  return count;
};

deleteTaskAndCount("5e4bfb3b60992b27c8a81485").then(count => console.log(count)).catch(e => console.log(e));


// Task.findByIdAndRemove("5e4bfc5772b86e095c2f45aa", {}).then(task => {
//   console.log(task);
//   return Task.countDocuments({ completed: false});
// }).then(result => {
//   console.log(result);
// }).catch(e => {
//   console.log(e);
// });