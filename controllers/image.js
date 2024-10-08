import Clarifai from "clarifai";

//   const PAT = "97a90ebabd904433ad45bfe5f1c70a4a";
//   const USER_ID = "8admve6ab303";
//   const APP_ID = "face-recognition-app";
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//           },
//         },
//       },
//     ],
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Key ${PAT}`,
//     },
//     body: raw,
//   };

//   return requestOptions;
// };
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});
//   fetch(
//     "https://api.clarifai.com/v2/models/face-detection/outputs",
//     returnClarifaiRequestOptions(req.body.input)
//   )
//     .then(response => {
//       res.json(response);
//     })
//     .catch(err => res.status(400).json("Unable to work with API"));
// };

// 8a5d13851c42490da4518bc64ac0d1ae

export const handleClarifaiRequest = (req, res) => {
  app.models
    .predict("face-detection", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"));
};

export const updateEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      if (entries.length) {
        res.json(entries[0].entries);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch(err => res.status(400).json("Error updating entries"));
};
