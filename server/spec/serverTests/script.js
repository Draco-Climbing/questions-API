import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('http://localhost:8000/qa/questions?product_id=12&page=1&count=5');
  sleep(1);
}