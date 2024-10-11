import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Roboto font weights
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>     
        <App />      
    </React.StrictMode>
  );
}
