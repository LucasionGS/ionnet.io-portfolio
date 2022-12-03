import React from "react";
import { Button, Divider, Group, Navbar, Paper, Space } from "@mantine/core";
import PageShell from "../../components/PageShell/PageShell";
import Link from "../../components/Router/Link";
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
import "./Projects.scss";
import User from "../../models/User";
import { IconEdit } from "@tabler/icons";

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
  const [hideSidebar, setHideSidebar] = React.useState<boolean>(window.innerWidth < 576);

  const user = User.getUser();

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
            {!hideSidebar && projects?.map((p) => (
              <Button variant="subtle" component={Link} href={`/projects/${p.id}`}>
                {p.shortName}
              </Button>
            ))}
          </Button.Group>
        </Navbar>
      )}
    >
      <Paper px="lg">
        {hideSidebar && (<Group>
          {projects?.map((p) => (
            <Button variant="subtle" component={Link} href={`/projects/${p.id}`}>
              {p.shortName}
            </Button>
          ))}
        </Group>)}
        <br />
        {project ? (
          <>
            <h1>
              {user && (
                <>
                  <Link href={`/admin/project/${project.id}`}>
                    <IconEdit />
                  </Link>
                  &nbsp;
                </>
              )}
              {project.name}
            </h1>
            <p>{project.description}</p>
            {
              project.link && (
                <p>
                  <a target="_blank" href={project.link}>{project.link}</a>
                </p>
              )
            }
            <Divider />
            {
              ReactHtmlParser(project.body)
            }
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
