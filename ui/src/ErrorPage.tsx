import React from 'react';
import PageShell from './components/PageShell/PageShell';
import { Alert, Loader, Paper } from '@mantine/core';
import Project from './models/Project';
import { renderProject } from './pages/Projects/renderProject';
import { fTitle } from './routes';

export const ErrorPage = (error: {
  statusCode?: number | undefined;
  error?: Error | undefined;
}) => {
  const [project, setProject] = React.useState<Project>(undefined!);

  React.useEffect(() => {
    fetch(`/api/projects/path?path=${window.location.pathname}`, {}).then(res => {
      if (res.ok) {
        res.json().then((data: Project) => {
          setProject(Object.assign(new Project(), data));
        });
      }
      else {
        setProject(null!);
      }
    });
  }, [window.location.pathname]);

  if (project) {
    window.document.title = fTitle(project.name);
  }

  return (
    <PageShell>
      {project === undefined ? <Loader /> : project !== null ? (
        <Paper px="lg">
          <br />
          {renderProject(project)}
          <br />
        </Paper>
      ) : (<Alert color="red" title="Error">
        {/* <h1>Error</h1> */}
        <h1>{error.statusCode ? `${error.statusCode}` : ""}</h1>
        <p>{error.error ? error.error.message : ""}</p>
      </Alert>)}
    </PageShell>
  );
};
