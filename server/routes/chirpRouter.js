const { GetChirps, GetChirp, CreateChirp, UpdateChirp, DeleteChirp } = require("../chirpstore");
const express = require("express");
const chirpstore = require("../chirpstore");

const chirpRouter = express.Router(); // Creating a new router named `pizza`
//current route is /api/chirps

//gets all chirps
chirpRouter.get("/", (req, res) => {
  try {
    const chirps = GetChirps();
    res.status(200).json(chirps);
  } catch (error) {
    console.log("Get Chirps error\n");
    console.log(error);
    res.status(500).json({ message: "Get Chirps Error occured" });
  }
});

//gets one chirp
chirpRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    const chirp = GetChirp(id);
    if (chirp?.Title) {
      res.status(200).json(chirp);
    } else {
      res.status(404).json({ Message: `You have found Nothing there at ${id}` });
    }
  } catch (error) {
    console.log("Get Single Chirp error\n");
    console.log(error);
    res.status(500).json({ message: "Get Single Chirp Error occured" });
  }
});

//posts a chirp
chirpRouter.post("/", (req, res) => {
  const newChirpInfo = req.body;
  try {
    CreateChirp(newChirpInfo);

    res.status(200).json({ Message: "Chirp was posted" });
  } catch (error) {
    console.log("postChirp error\n");
    console.log(error);
    res.status(500).json({ Message: "Post Chirp error occured" });
  }
});
// edits chirp
chirpRouter.put("/:id", (req, res) => {
  //an edit request with the specific id of the chirp being requested to edit
  const editChirpInfo = req.body; //grabs the new chirp info off the body of the request
  const id = req.params.id; //which specific chirp is being edited

  const doesChirpExist = GetChirp(id); //a check to see if the requested chirp to edit exists in the first place
  if (doesChirpExist?.Title) {
    //if chirp does exist run try/catch block
    try {
      UpdateChirp(id, editChirpInfo); //runs with id of chirp and new body info
      res.status(200).json({ Message: `Chirp ${id} was updated to show ${editChirpInfo.Title}` }); //respond with a good status
    } catch (error) {
      console.log("edit Chirp error\n"); //if error occurs reponse
      console.log(error); //log error
      res.status(500).json({ Message: "edit Chirp error occured" }); //front end error response
    }
  } else {
    //if chirp does Not exist
    res.status(404).json({ Message: "You Fool! You are not allowed to edit something that doesnt exist!!!" }); //if chirp does not exist error respose
  }
});
//Deletes a chirp by using it's id
chirpRouter.delete("/:id", (req, res) => {
  const id = req.params.id; //which specific chirp is being Deleted

  const doesChirpExist = GetChirp(id); //a check to see if the requested chirp to edit exists in the first place
  if (doesChirpExist?.Title) {
    try {
      DeleteChirp(id);
      res.status(200).json({ Message: `The deed is done, the Chirp once known by ${id} is dusted` });
    } catch (error) {
      console.log("delete Chirp error\n");
      console.log(error);
      res.status(500).json({ message: "delete Chirp error Occured" });
    }
  } else {
    res.status(404).json({ Message: "Yes, you have tried to delete something that don't exist, but it failed" });
  }
  // Create something
});

module.exports = chirpRouter; // Default export is our little router here
