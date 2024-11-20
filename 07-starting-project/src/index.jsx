import { StrictMode } from 'react';     // StrictMode는 어떤 컴포넌트 내에서든 사용할 수 있으며 특정 컴포넌트만 감싸서 사용할 수 있다. StrictMode는 개발시엔 모든 함수를 두번 실행. 배포시에는 영향이 없다.
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
