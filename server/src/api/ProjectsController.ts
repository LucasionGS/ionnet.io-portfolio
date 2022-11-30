import { Router, json } from "express";
import Project, { ProjectAttributes } from "../models/Project";
import User from "../models/User";

namespace ProjectsController {
  export const router = Router();

  export async function getProjects(): Promise<Project[]> {
    return Project.getProjects();
  }
  router.get("/", async (req, res) => {
    res.json(await getProjects());
  });

  export async function getProject(id: number): Promise<Project> {
    return Project.getProject(id);
  }
  router.get("/:id", async (req, res) => {
    res.json(await getProject(+req.params.id));
  });

  export async function createProject(project: ProjectAttributes): Promise<Project> {
    return Project.createProject(project);
  }
  router.post("/", json(), async (req, res) => {
    const user = await User.auth(req);
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    
    res.json(await createProject(req.body));
  });
  
}

export default ProjectsController;