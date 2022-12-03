import User from "./User";

export default class Project {
  public id!: number;
  public shortName!: string;
  public name!: string;
  public description!: string;
  public link?: string;
  public body!: string;

  public static async getProject(id: number): Promise<Project> {
    return fetch(`/api/projects/${id}`).then(async res => Object.assign(new Project, await res.json()));
  }

  public static async createProject(data: {
    shortName: string,
    name: string,
    description: string,
    link?: string,
    body: string,
  }): Promise<Project> {
    return fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...User.headers
      },
      body: JSON.stringify(data)
    }).then(async res => Object.assign(new Project, await res.json()));
  }
}