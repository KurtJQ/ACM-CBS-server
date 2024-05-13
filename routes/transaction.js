import express from "express";
import db from "../db/connection.js";
import { Int32 } from "mongodb";

const router = express.Router();

//Get List

router.get("/", async (req, res) => {
  try {
    let collection = db.collection("transactions");
    let results = await collection.find({}).toArray();

    res.send(results).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving all transactions");
  }
});

//Get List by ID
router.get("/:id", async (req, res) => {
  let collection = await db.collection("transactions");
  let query = { _id: new Int32(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not Found").status(404);
  else res.send(result).status(200);
});

//Get Many by ID
router.get("/list/:id", async (req, res) => {
  try {
    const query = { studentID: new Int32(req.params.id) };

    const collection = db.collection("transactions");
    let result = await collection.find(query).toArray();

    res.send(result).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving transactions");
  }
});

//Add
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      _id: req.body._id,
      studentID: req.body.studentID,
      cashierID: req.body.cashierID,
      amount: req.body.amount,
      item: req.body.item,
      date: req.body.date,
      year: req.body.year,
      semester: req.body.semester,
    };
    let collection = db.collection("transactions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (e) {
    res.status(500).send("Error adding transaction!");
  }
});

//Edit
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new Int32(req.params.id) };
    const updates = {
      $set: {
        cashierID: req.body.cashierID,
        amount: req.body.amount,
        item: req.body.item,
        date: req.body.date,
        year: req.body.year,
        semester: req.body.semester,
      },
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating transaction!");
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new Int32(req.params.id) };

    const collection = db.collection("transactions");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting transaction");
  }
});

export default router;
