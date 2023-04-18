import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import App from './App';
import './index.css';

const UtilityCSS = styled.div`
  .mb-xxl {
    margin-bottom: 6rem;
  }
  .mb-xl {
    margin-bottom: 4rem;
  }
  .mb-lg {
    margin-bottom: 3rem;
  }
  .mb-md {
    margin-bottom: 2rem;
  }
  .mb-sm {
    margin-bottom: 1rem;
  }
  .mb-xs {
    margin-bottom: 0.5rem;
  }
  .bold {
    font-weight: 700;
  }
  .italic {
    font-style: italic;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .capitalize {
    text-transform: capitalize;
  }
  .full-caps {
    text-transform: uppercase;
  }
  .break-word {
    word-break: break-word;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilityCSS>
        <App />
      </UtilityCSS>
    </BrowserRouter>
  </React.StrictMode>
);
