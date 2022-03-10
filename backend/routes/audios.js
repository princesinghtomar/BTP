const express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  jwtdecode = require("jwt-decode"),
  auth = require("../middleware/auth");

(Au_dio = require("../models/audio")), (config = require("../config"));


router.post('/audio_response', (req,res) => {
    let newAudio = new Au_dio();

    newAudio.newUser.created_at = new Date();
    newAudio.inputtext = req.body.inputtext;
    newAudio.audioData = req.body.audioData;
    // newAudio.outputtext = outputtext;
    // newAudio.feedback = feedback;
    newAudio.outputtext = "This is your output from the Algorithm";
    newAudio.feedback = "This is your Feedback";
    newAudio.save(function (err, saved) {
		try {
		if (err) throw err.errmsg;

		res.status(200).json({
			success: true,
			message: "Successfully registered",
            outputtext: newAudio.outputtext,
            feedback: newAudio.feedback,
		})
		}
		catch(e) {
			res.status(500).json({
				success: false, 
				message: "Something has gone wrong",
                outputtext: "Output Returned by the Algorithm is displayed here",
                feedback: "Feedback Returned by the Algorithm is displayed here",
			})
		}
	})
})