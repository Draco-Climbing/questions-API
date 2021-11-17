const express = require('express');
const { QuestionsRepo, AnsweresRepo, PhotosRepo } = requite('../database/');

let app = express();

app.listen(8000, function () {
  console.log('server running on port 8000');
})

// app.use(express.static(__dirname, ))

