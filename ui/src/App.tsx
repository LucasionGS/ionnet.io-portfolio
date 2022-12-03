import React from 'react';
import './App.scss';
import Router from './components/Router';
import PageShell from './components/PageShell/PageShell';
import { Alert, MantineProvider, Paper } from '@mantine/core';
import { SpotlightAction, SpotlightProvider, SpotlightProviderProps } from '@mantine/spotlight';
import { routes } from './routes';
import User from './models/User';

function App() {
  const user = User.getUser();

  return (
    <MantineProvider theme={{
      colorScheme: "dark",
    }}>
      <SpotlightProvider
        actions={
          user ? [...adminActions, ...actions.filter(a => a.title !== "Login")] : actions
        }

      // shortcut={}
      >
        <Router pages={routes} LoadingPage={Loading} ErrorPage={ErrorPage} />
      </SpotlightProvider>
    </MantineProvider>
  );
}

const adminActions: SpotlightAction[] = [
  {
    group: "Admin",
    title: "New Project",
    description: "Create a new project",
    closeOnTrigger: true,
    onTrigger() {
      window.location.pathname = "/admin/project/new";
    },
  },
  // Logout
  {
    group: "Admin",
    title: "Logout",
    description: "Logout of the admin panel",
    closeOnTrigger: true,
    onTrigger() {
      User.logout();
      window.location.pathname = "/";
    }
  }
];

const actions: SpotlightAction[] = [
  {
    group: "Shortcuts",
    title: "Projects",
    description: "View all projects",
    closeOnTrigger: true,
    onTrigger() {
      window.location.pathname = "/projects";
    }
  },
  {
    group: "Shortcuts",
    title: "Resume",
    description: "View my resume",
    closeOnTrigger: true,
    onTrigger() {
      window.location.pathname = "/resume";
    }
  },
  {
    group: "Shortcuts",
    title: "Login",
    description: "Login to the admin panel",
    closeOnTrigger: true,
    onTrigger() {
      window.location.pathname = "/login";
    }
  },
];

const Loading = () => (
  <PageShell>
    <Paper px="lg">

    </Paper>
  </PageShell>
);

const ErrorPage = (error: {
  statusCode?: number | undefined;
  error?: Error | undefined;
}) => (
  <PageShell>
    <Alert color="red" title="Error">
      {/* <h1>Error</h1> */}
      <h1>{error.statusCode ? `${error.statusCode}` : ""}</h1>
      <p>{error.error ? error.error.message : ""}</p>
    </Alert>
  </PageShell>
);

export default App;
