import React from 'react';
import './App.css';

import { Route, RouterProvider, Routes, createBrowserRouter, useRoutes } from 'react-router-dom';
import Customize from './routes/customize';
import '@mantine/core/styles.css';
import { DEFAULT_THEME, MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({

});

function App() {

  

  const routes = useRoutes([
    {
      path: "/",
      element: <Customize />
    }
  ]);

  return (
    <MantineProvider>
      {routes}
    </MantineProvider>
  );
}

export default App;
