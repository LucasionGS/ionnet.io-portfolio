import { Router } from "express";
import ProjectsController from "./ProjectsController";

namespace ApiController {
  export const router = Router();

  router.use("/projects", ProjectsController.router);
}

export default ApiController;