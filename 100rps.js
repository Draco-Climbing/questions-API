import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

// const url = `http://localhost:8000/qa/questions`; 
const url = `localhost:8000/qa/questions?product_id=12&page=1&count=5`

export default function () {
  const res = http.get('http://localhost:8000/qa/questions?product_id=12&page=1&count=5');
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
  sleep(0.1);
}
