import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createRoot } from 'react-dom/client';
import 'reset-css';
import App from './pages/App';

const app = document.createElement('div');
document.body.appendChild(app);

const root = createRoot(app);
root.render(<App/>);
