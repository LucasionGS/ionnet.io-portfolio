import { Router, json } from "express";
import Project, { ProjectAttributes } from "../models/Project";
import User from "../models/User";
import RequestError from "../objects/RequestError";

namespace ProjectsController {
  export const router = Router();

  export async function getProjects(includeHidden?: boolean): Promise<Project[]> {
    return Project.getProjects(includeHidden ?? false);
  }
  router.get("/", async (req, res) => {
    const user = await User.auth(req, true);
    if (user) {
      res.json(await getProjects(true));
    } else {
      res.json(await getProjects(false));
    }
  });

  export async function getProjectByPath(path: string): Promise<Project> {
    return Project.getProjectByPath(path);
  }
  router.get("/path", async (req, res) => {
    const path = req.query.path as string;
    if (!path) {
      return RequestError.badRequest("No path provided").send(res);
    }
    const project = await getProjectByPath(path);
    if (!project) {
      return RequestError.notFound("Project not found").send(res);
    }
    res.json(project);
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
  
  export async function updateProject(id: number, project: ProjectAttributes): Promise<Project> {
    return Project.updateProject(id, project);
  }
  router.put("/:id", json(), async (req, res) => {
    const user = await User.auth(req);
    if (!user) {
      res.status(401).send("Unauthorized");
      return;
    }
    
    delete req.body.id;
    res.json(await updateProject(+req.params.id, req.body));
  });
}

export default ProjectsController;