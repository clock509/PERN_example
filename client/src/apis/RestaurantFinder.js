import axios from 'axios';

export default axios.create({ //axios instance 생성
  baseURL: "http://localhost:3001/api/v1/restaurants"   //기본 URL 설정(Express 서버? node 서버? 중 하나와 맞춰야 한다!!!). 끝에 '/'를 안 붙이도록 주의한다.
})