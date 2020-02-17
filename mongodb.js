// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = `mongodb://127.0.0.1:27017`;
const databaseName = `task-manager`;


MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (error, client) => {
  if (error) {
    return console.log("Unable to connect");
  }

  const db = client.db(databaseName);

  // DELETING

  // db.collection("users").deleteMany({
  //   age: 22
  // }).then(result => console.log(result))
  // .catch(error => console.log(error));

  // db.collection("tasks").deleteOne({
  //   description: "third"
  // }).then(result => console.log(result))
  // .catch(error => console.log(error));

  // UPDATING

  // db.collection("users").updateOne({ _id: new ObjectID("5e4ab81d38f2dd2af4ef8da4")}, {
  //   $inc: {
  //     age: -100
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => {
  //   console.log(error);
  // });

  // db.collection("tasks").updateMany({ completed: false }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then(result => {
  //   console.log(result);
  // }).catch(error => console.log(error));

  // READING

  // db.collection("users").findOne({ _id: new ObjectID("5e4ab94b5a836417ec9151ae") }, (error, user) => {
  //   if (error) {
  //     return console.log("Unable to fetch");
  //   }

  //   console.log(user);
  // });

  // db.collection("users").find({ age: 27 }).toArray((error, users) => {
  //   if (error) {
  //     return console.log("Error");
  //   }
  //   console.log(users);
  // });

  // db.collection("users").find({ age: 27 }).count((error, count) => {
  //   if (error) {
  //     return console.log("Error");
  //   }
  //   console.log(count);
  // });

    // db.collection("tasks").findOne({ _id: new ObjectID("5e4aba6bb8195519acf5ee61")}, (error, task) => {
    //   console.log(task);
    // });

    // db.collection("tasks").find({ completed: false }).toArray((error, tasks) => {
    //   console.log(tasks);
    // });

});