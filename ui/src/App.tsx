import React from 'react';
import './App.scss';
import Router, { PageBuild } from './components/Router';
import PageShell from './components/PageShell/PageShell';
import { Alert, MantineProvider, Paper } from '@mantine/core';

function App() {
  return (
    <MantineProvider theme={{
      colorScheme: "dark",
    }}>
      <Router pages={routes} LoadingPage={Loading} ErrorPage={ErrorPage} />
    </MantineProvider>
  );
}

const title = (t: string) => t + " | Ionnet Portfolio";
const routes: PageBuild[] = [
  {
    path: /^\/$/,
    content: () => import("./pages/Home").then((module) => module.default),
    title: title("Home"),
  },
  {
    path: /^\/projects(?:\/(\d+))?$/,
    async content(id) {
      const Projects = await import("./pages/Projects/Projects").then((module) => module.default);
      return <Projects projectId={id ? +id : undefined} />;
    },
    title: title("Projects"),
  },
  {
    path: /^\/login$/,
    content: () => import("./pages/Login").then((module) => module.default),
    title: title("Login"),
  }
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
