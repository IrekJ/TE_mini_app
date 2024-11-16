import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import { RecoilRoot } from 'recoil';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);