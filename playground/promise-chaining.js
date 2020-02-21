require("../src/db/mongoose");

const User = require("../src/models/user");

// 5e4bf25c76edb709446c74a4

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5e4bf25c76edb709446c74a4", 2).then(count => {
  console.log(count);
}).catch(e => {
  console.log(e);
});

// User.findByIdAndUpdate("5e4bf25c76edb709446c74a4", {
//   age: 100
// }).then(user => {
//   console.log(user);
//   return User.countDocuments({ age: 1});
// }).then(result => {
//   console.log(result);
// }).catch(e => {
//   console.log(e);
// });