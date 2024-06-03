import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './store';
import { ThemeContextProvider } from './store/themeContext';
import TanstackProvider from './providers/tanstackProvider';

import './assets/styles/main.sass';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <TanstackProvider>
        <App />
      </TanstackProvider>
    </ThemeContextProvider>
  </Provider>
);
