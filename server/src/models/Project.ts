import { Model, DataTypes } from "sequelize";
import sql from "../sql";

export interface ProjectAttributes {
  id: number;
  shortName: string;
  name: string;
  description: string;
  link?: string;
  body: string;
}

export interface ProjectCreationAttributes {
  shortName: string;
  name: string;
  description: string;
  body: string;
}

export default class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public shortName!: string;
  public name!: string;
  public description!: string;
  public link?: string;
  public body!: string;

  public static async getProject(id: number): Promise<Project> {
    return Project.findByPk(id);
  }

  public static async getProjects(): Promise<Project[]> {
    return Project.findAll();
  }

  public static async createProject(project: ProjectAttributes): Promise<Project> {
    return Project.create(project);
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
  }
}, {
  sequelize: sql,
  tableName: "projects"
});