const express = require("express");
const router = express.Router();
const Sentences = require("../models/SentencesSchema");

router.get("/getSentences", (req, res) => {
  const total_sentences = Sentences.estimatedDocumentCount();
  const sentence_id = Math.floor((total_sentences+1) * Math.random());

  Sentences.findOne({ id: sentence_id }, function (err, sntnc) {
    if (err) {
      console.log(err);
    } else {
      if (sntnc) res.json(sntnc);
      else {
        res.status(500).json({
          success: false,
          message: "Something has gone wrong while getting Sentence",
        });
      }
    }
  });
});

router.post("/saveSentence", (req, res) => {
  const total_sentences = Sentences.estimatedDocumentCount();
  let newSntnc = new Sentences();

  newSntnc.id = total_sentences + 1;
  newSntnc.sentence = req.body.sentence;
  newSntnc.created_at = new Date();

  newSntnc.save(function (err, saved) {
    try {
      if (err) throw err.errmsg;
      else {
        res.status(200).json({
          success: true,
          message: "Sentence Saved",
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Something has gone wrong while saving Sentence",
      });
    }
  });
});

module.exports = router;
