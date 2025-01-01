import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import AppTheme from '../../theme/AppTheme';
import {chartsCustomizations} from './theme/customizations/charts.ts';
import {dataGridCustomizations} from './theme/customizations/dataGrid.ts';
import {datePickersCustomizations} from './theme/customizations/datePickers.ts';

import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CustomerGrid from './components/CustomerGrid';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  
  //If not  logged in do not allow access
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const location = useLocation();
    const { fullname='', email='' } = location.state as { fullname: string; email: string } || {}; //type declared on the go
    const [activeView, setActiveView] = React.useState('home');

    React.useEffect(() => {
      const aToken = localStorage.getItem('accessToken');
      const rToken = localStorage.getItem('refreshToken');

      if (!aToken && !rToken) { // Both tokens required
          navigate('/login');
          return; // Prevent further execution of the effect
      }
      else
      {
        setIsAuthenticated(true); // Set authentication status
      }
  
    }, [navigate]); // Only depend on 'navigate'

    // Callback function to update activeView from AppNavbar or SideMenu
    const handleViewChange = (view: string) => { setActiveView(view); };
  
  // Only render the dashboard IF authenticated conditional return :?
  return isAuthenticated ? (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu fullName={fullname} email={email} onMenuClick={handleViewChange} />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default', // Use bgcolor instead of backgroundColor
            overflow: 'auto',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header activeView={activeView}/>
              {activeView === 'home' && <MainGrid />}           {/* Conditionally render MainGrid */}
              {activeView === 'customers' && <CustomerGrid />}  {/* Conditionally render CustomerGrid */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  ): ( 
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress /> {/* Display loading indicator while waiting */}
    </Box>
  );
}
