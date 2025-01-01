import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import AppTheme from './theme/AppTheme';
import AppRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTheme>
      <CssBaseline />
      <AppRoutes />
    </AppTheme>
  </React.StrictMode>,
);