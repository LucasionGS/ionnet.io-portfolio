import { Button, Navbar, Paper } from "@mantine/core";
import React from "react";
import PageShell from "../../components/PageShell/PageShell";
import Link from "../../components/Router/Link";
import "./Projects.scss";

interface ProjectsProps {
  projectId?: number;
}

interface Project {
  id: number;
  shortName: string;
  name: string;
  description: string;
  link: string;
  body: string;
}

export default function Projects(props: ProjectsProps) {
  const [projects, setProjects] = React.useState<Project[]>();
  const [project, setProject] = React.useState<Project>();

  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => {
        setProjects(data);
        if (props.projectId) {
          setProject(data.find((p) => p.id === props.projectId));
        }
      });
  }, [props.projectId]);

  const age = Math.floor((Date.now() - new Date(2002, 2, 9).getTime()) / 1000 / 60 / 60 / 24 / 365.25)
  return (
    <PageShell
      navbar={(
        <Navbar
          className="projects-navbar"
          width={{
            xs: 192,
            sm: 192,
            md: 192,
            lg: 192,
            xl: 192,
          }}
        >
          <Button.Group orientation="vertical">
            {/* <Button variant="subtle">
              <Link href="/projects">Any</Link>
            </Button> */}
            {projects?.map((p) => (
              <Button variant="subtle" component={Link} href={`/projects/${p.id}`}>
                {p.shortName}
              </Button>
            ))}

          </Button.Group>
        </Navbar>
      )}
    >
      <Paper px="lg">
        <br />
        {project ? (
          <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {
              project.link && (
                <p>
                  <a href={project.link
                  }>{project.link}</a>
                </p>
              )
            }
            <p>{project.body}</p>
          </>
        ) : (
          <>
            <h1>Projects</h1>
            <p>
              Select a project from the left to see more information about it.
            </p>
          </>
        )}
        <br />
      </Paper>
    </PageShell>
  )
}
