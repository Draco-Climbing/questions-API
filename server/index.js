const express = require('express');
// const { Questions, Answers, Photos, db, resultdata } = require('../database/');
// const { answersWithPhotos, questionsWithAnswers, resultDataAgg } = require('./aggregates')
const controller = require('./controllers');
const Auth = require('./authentication/config')

let app = express();

app.use(express.json())
app.listen(3000, function () {
  console.log('server running on port 3000');
})

app.use(express.static('public'));

// function authChecker(req, res, next) {
//   // console.log(req, req.headers.authorization, Auth.API_KEY)
//     if (req.headers.authorization === Auth.API_KEY) {
//         next();
//     } else {
//        res.send("401 NOT AUTHORIZED", 401);
//     }
// }

// app.use(authChecker)

app.get('/qa/questions/', controller.getControllers.getQuestions)
app.get('/qa/z/', controller.getControllers.getQuestionsZ)
app.get('/qa/questions/:question_id/answers', controller.getControllers.getAnswers)

app.put('/qa/questions/:question_id/helpful', controller.putControllers.helpfulAnswer)
app.put('/qa/questions/:question_id/report', controller.putControllers.reportQuestion)
app.put('/qa/answers/:answer_id/report', controller.putControllers.reportAnswer)

app.post('/qa/questions/', controller.postControllers.postQuestion)
app.post('/qa/questions/:question_id/answers', controller.postControllers.postAnswer)