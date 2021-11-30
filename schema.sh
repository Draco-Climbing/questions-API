mongoimport -d sdc-questions -c answers --headerline --columnsHaveTypes --type='csv' answers.csv
mongoimport -d sdc-questions -c questions --headerline --columnsHaveTypes --type='csv' questions.csv
mongoimport -d sdc-questions -c photos --headerline --columnsHaveTypes --type='csv' answers_photos.csv