import { Router, json } from "express";
import User, { UserAttributes } from "../models/User";
import RequestError from "../objects/RequestError";

namespace UserController {
  export const router = Router();

  export async function getUsers(): Promise<User[]> {
    return User.getUsers();
  }
  // router.get("/", async (req, res) => {
  //   res.json(await getUsers());
  // });

  export async function getUser(id: number): Promise<User> {
    return User.getUser(id);
  }
  // router.get("/:id", async (req, res) => {
  //   res.json(await getUser(+req.params.id));
  // });

  export async function register(username: string, password: string): Promise<User> {
    return User.createUser(username, password);
  }
  // Disabled registration
  // router.post("/", express.json(), async (req, res) => {
  //   const { username, password } = req.body as UserAttributes;
    
  //   res.json(await register(username, password));
  // });

  export async function login(username: string, password: string): Promise<User> {
    if (await User.count() === 0) {
      await register(username, password);
    }
    
    return User.authenticate(username, password);
  }
  router.post("/login", json(), async (req, res) => {
    const { username, password } = req.body as UserAttributes;
    
    try {
      const user = await login(username, password);
      if (user) {
        res.json(user.toPrivateJSON());
      }
    } catch (error: any) {
      RequestError.unauthorized(error.message).send(res);
    }
  });

  // export async function updateUser(user: Partial<UserAttributes> & { id: number }): Promise<User> {
  //   const { id, ...attributes } = user;
  //   if (isNaN(id)) {
  //     throw new Error("Invalid user id");
  //   }
    
  //   if (Object.keys(attributes).length === 0) {
  //     throw new Error("No attributes provided");
  //   }
    
  //   return User.getUser(id).then((u) => u?.update(attributes));
  // }
  // router.put("/:id", express.json(), async (req, res) => {
  //   const user = await User.auth(req);
  //   if (user.id !== +req.params.id) {
  //     throw new Error("Unauthorized");
  //   }
    
  //   res.json(await updateUser(req.body));
  // });
}

export default UserController;