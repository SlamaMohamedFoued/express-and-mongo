const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");

const app = express();

app.use(express.json());

const mongo_url = "mongodb://localhost:27017";
const dbName = "foods";

MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log(err);
  else {
    const db = client.db(dbName);

    app.post("/addFood", (req, res) => {
      let newFood = req.body;
      db.collection("tounsi").insert(newFood, (err, data) => {
        if (err) console.log(err);
        else res.send("food added");
      });
    });
    app.delete("/deleteFood/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection("tounsi").deleteOne({ _id: id }, (err, data) => {
        if (err) console.log(err);
        else res.send("food deleted");
      });
    });
    app.put("/update/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      let updatedFood = req.body;
      db.collection("tounsi").findOneAndUpdate(
        { _id: id },
        { $set: { ...updatedFood } },
        (err, data) => {
          if (err) console.log(err);
          else res.send("food updated");
        }
      );
    });
    app.get("/foods", (req, res) => {
      db.collection("tounsi")
        .find()
        .toArray((err, data) => {
          if (err) console.log(err);
          else res.send(data);
        });
    });
  }
});

app.listen(5001, err => {
  if (err) console.log(err);
  else console.log("server running on port 5001");
});
