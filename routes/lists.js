const express = require("express");
const router = express.Router();

const List = require("../models/List");

router.get("/", (req, res) => {
  List.find()
    .select("-__v")
    .exec((err, list) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(list);
    });
});

router.post("/", (req, res) => {
  List.findOrCreate(req.body, (err, list) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(list);
  });
});

router.get("/:id", (req, res) => {
  List.findOne({ _id: req.params.id }, (err, list) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(list);
  });
});

router.patch("/:id", (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select("-__v")
    .exec((err, updatedList) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(updatedList);
    });
});

router.delete("/:id", (req, res) => {
  List.findByIdAndRemove(req.params.id, (err, list) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "List deleted successfully"
    };
    return res.status(200).send(response);
  });
});

module.exports = router;
