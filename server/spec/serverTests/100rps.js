import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  vus: 100,
  duration: '15s',
};

export default function () {
  group('Check GET request', () => {

  const res = http.get('http://127.0.0.1:8000/qa/questions?product_id=1000011&page=1&count=5');
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });
  })

  // group('Check Post Request', () => {
  //   const res = http.get('http://localhost:8000/qa/questions/3518972/answers');
  //   check(res, {
  //     'is status 200': r => r.status === 200,
  //     'transaction time < 200ms': r => r.timings.duration < 200,
  //     'transaction time < 500ms': r => r.timings.duration < 500,
  //     'transaction time < 1000ms': r => r.timings.duration < 1000,
  //     'transaction time < 2000ms': r => r.timings.duration < 2000,
  //   });
  // })
}