import { Router } from "express";

namespace ProjectsController {
  export const router = Router();
  export interface Project {
    id: number;
    shortName: string;
    name: string;
    description: string;
    link?: string;
    body: string;
  }

  export function getProjects(): Project[] {
    return [
      {
        id: 1,
        shortName: "Ioncore",
        name: "Ioncore Fullstack Template",
        description: "Ioncore is a base template I use for React/Express full stack web apps.",
        body: `
          <p>
            Ioncore is a base template I use for React/Express full stack web apps.
            It is a work in progress, but I use it for some projects that need a React frontend and an Express backend.
          </p>
        `
      }
    ];
  }
  router.get("/", (req, res) => {
    res.json(getProjects());
  });

  export function getProject(id: number): Project | undefined {
    return getProjects().find(project => project.id === id);
  }
  router.get("/:id", (req, res) => {
    res.json(getProject(+req.params.id));
  });
}

export default ProjectsController;