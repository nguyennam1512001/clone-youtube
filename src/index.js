import React from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import './styles/styles.scss';

import App from '~/App';
import IntlProviderWrapper from '~/hoc/IntlProviderWrapper';

import { Provider } from 'react-redux';
import reduxStore, { persistor } from '~/redux';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles';
const renderApp = () => {
  const root = document.getElementById('root');
  const rootElement = (
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <GlobalStyles>
          <App persistor={persistor} />
        </GlobalStyles>
      </IntlProviderWrapper>
    </Provider>
  );

  const rootContainer = createRoot(root);
  rootContainer.render(rootElement);
};

renderApp();
