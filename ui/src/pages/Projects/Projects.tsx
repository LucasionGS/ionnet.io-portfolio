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
  const [hideSidebar, setHideSidebar] = React.useState<boolean>(false);

  function onResize() {
    setHideSidebar(window.innerWidth < 576);
  }
  
  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching projects");
        }
      })
      .then((data: Project[]) => {
        setProjects(data);
        if (props.projectId) {
          setProject(data.find((p) => p.id === props.projectId));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, [props.projectId]);
  
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
          style={{
            width: 0,
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
