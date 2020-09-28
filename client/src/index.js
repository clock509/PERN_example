import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById("root")) //App 컴포넌트는 부모 컴포넌트로서 전체 앱을 감싼다. //../public/index.html에서 id가 root인 컴포넌트를 render한다.

//라이브러리 설치: bootstrap, fontAwesome을 설치한다.
//부트스트랩: https://getbootstrap.com/docs/4.5/getting-started/introduction/ 접속 => CSS stylesheet 복사 => ../public/index.html에 paste
//fontAwesome: cdnjs 접속 => font awesome 검색 => link tag 복사 => ../public/index.html에 복사

//라이브러리 설치: react-router-dom
//라이브러리 설치: axios(=백엔드로 데이터 전달. fetch와 같음)