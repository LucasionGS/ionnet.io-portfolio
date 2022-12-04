import React from 'react';
import './App.scss';
import Router from './components/Router';
import PageShell from './components/PageShell/PageShell';
import { MantineProvider, Paper } from '@mantine/core';
import { SpotlightAction, SpotlightProvider, SpotlightProviderProps } from '@mantine/spotlight';
import { routes } from './routes';
import User from './models/User';
import { ErrorPage } from './ErrorPage';

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
      window.location.pathname = "/admin/projects/new";
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

export default App;
