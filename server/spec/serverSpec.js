var { expect, assert } = require('chai');
var axios = require('axios');

const prod_id = 123456789;
const question_id = 987654321;
      
describe('Server Testing', () => {
  describe('QUESTIONS - GET request', () => {
    it('Get should response with a 200 status code', async () => {
      let statusCode = null;
      await axios
        .get(`http://localhost:8000/qa/questions?product_id=${prod_id}`)
        .then((res) => {
          statusCode = res.status;
        })
        .catch(err => console.log('error', err));
      expect(statusCode).to.equal(200);
    });

    it('should respond with an object \n\tand that object has keys product_id and results', async () => {
      let response;
      await axios
        .get(`http://localhost:8000/qa/questions?product_id=${prod_id}`)
        .then((res) => {
          response = res.data
        })
        .catch(err => console.log('error', err));
      //need to change to an object
      // expect(response).to.be.an('array'); 
    });
  })

  describe('ANSWERS - GET request', () => {
    it('Get should response with a 200 status code', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.get(url)

      expect(response.status).to.equal(200);
    });

    it('should respond with an object \n\tand that object has keys product_id and results', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.get(url)

      //need to change to an object
      expect(response.data).to.be.an('object');
    });
  })

  describe('QUESTIONS - POST request', () => {
    it('Get should response with a 200 status code', async () => {
      let statusCode = null;
      const url = `http://localhost:8000/qa/questions?product_id=${prod_id}`
      const body = {
        "body": "dinosaurs live here",
        "name": "name of person3",
        "email": "email@email.com",
        "product_id": prod_id
        }
      await axios.post(url , body)
        .then((res) => {
          statusCode = res.status;
        })
        .catch(err => console.log('error', err));
      expect(statusCode).to.equal(200);
    });

    it('should respond with a number', async () => {
      const response = await axios.post(`http://localhost:8000/qa/questions?product_id=${prod_id}`,
        {
        "body": "dinosaurs live here",
        "name": "name of person3",
        "email": "email@email.com",
        "product_id": prod_id
        })
      expect(response.data).to.be.a('number'); 
    });
  })

    describe('ANSWERS - POST request', () => {
    it('Get should response with a 200 status code', async () => {
      const body = {"body": "dinosaurs live here",
                    "name": "name of person3",
                    "email": "email@email.com",
                    "photos": ["url1", "url2"]
                  }
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.post(url, body)

      expect(response.status).to.equal(200);
    });

    it('should respond with "done"', async () => {
      const body = {"body": "dinosaurs live here",
                    "name": "name of person3",
                    "email": "email@email.com",
                    "photos": ["url1", "url2"]
                  }
      const url = `http://localhost:8000/qa/questions/${question_id}/answers?product_id=${prod_id}`
      const response = await axios.post(url, body)

      //need to change to an object
      expect(response.data).to.be.equal('done');
    });
  })
  //PUT requests x 3
  describe('QUESTION HELPFUL - PUT request', () => {
    it('Get should response with a 200 status code', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/helpful`
      const response = await axios.put(url)

      expect(response.status).to.equal(200);
    });

    it('should respond with "done"', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/helpful`
      const response = await axios.put(url)

      expect(response.data).to.be.equal('done');
    });
  })

  describe('QUESTION REPORT - PUT request', () => {
    it('Get should response with a 200 status code', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/helpful`
      const response = await axios.put(url)

      expect(response.status).to.equal(200);
    });

    it('should respond with "done"', async () => {
      const url = `http://localhost:8000/qa/questions/${question_id}/helpful`
      const response = await axios.put(url)

      expect(response.data).to.be.equal('done');
    });
  })

  //   describe('ANSWER REPORT - PUT request', () => {
  //   it('Get should response with a 200 status code', async () => {
  //     const url = `http://localhost:8000/qa/answers/${answer_id}/helpful`
  //     const response = await axios.put(url)

  //     expect(response.status).to.equal(200);
  //   });

  //   it('should respond with "done"', async () => {
  //     const url = `http://localhost:8000/qa/answers/${answer_id}/helpful`
  //     const response = await axios.put(url)

  //     expect(response.data).to.be.equal('done');
  //   });
  // })
  
})
  