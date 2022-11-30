import { Router } from "express";
import ProjectsController from "./ProjectsController";
import UserController from "./UserController";

namespace ApiController {
  export const router = Router();

  router.use("/projects", ProjectsController.router);
  router.use("/user", UserController.router);
}

export default ApiController;