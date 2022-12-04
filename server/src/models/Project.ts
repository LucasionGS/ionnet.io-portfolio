import { Model, DataTypes } from "sequelize";
import sql from "../sql";

export interface ProjectAttributes {
  id: number;
  shortName: string;
  name: string;
  description: string;
  link?: string;
  body: string;
  path?: string;
  hidden: boolean;
}

export interface ProjectCreationAttributes {
  shortName: string;
  name: string;
  description: string;
  body: string;
  path?: string;
  hidden: boolean;
}

export default class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public shortName!: string;
  public name!: string;
  public description!: string;
  public link?: string;
  public body!: string;
  public path?: string;
  public hidden!: boolean;


  public static async getProjectByPath(path: string): Promise<Project> {
    return Project.findOne({
      where: {
        path: path
      }
    });
  }

  public static async getProject(id: number): Promise<Project> {
    return Project.findByPk(id);
  }

  public static async getProjects(includeHidden: boolean = false): Promise<Project[]> {
    return Project.findAll(
      includeHidden
        ? {}
        : {
          where: {
            hidden: false,
          },
        }
    );
  }

  public static async createProject(project: ProjectAttributes): Promise<Project> {
    return Project.create(project);
  }

  public static async updateProject(id: number, project: ProjectAttributes): Promise<Project> {
    const p = await Project.getProject(id);
    if (!p) {
      throw new Error(`Project ${id} not found`);
    }
    return p.update(project);
  }
}

Project.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hidden: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize: sql,
  tableName: "projects"
});