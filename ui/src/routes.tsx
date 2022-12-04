import React from 'react';
import { PageBuild } from './components/Router';

export const fTitle = (t: string) => t + " | Ionnet Portfolio";
export const routes: PageBuild[] = [
  // {
  //   path: /^\/$/,
  //   content: () => import("./pages/Home").then((module) => module.default),
  //   title: fTitle("Home"),
  // },
  {
    path: /^\/projects(?:\/(\d+))?$/,
    async content(id) {
      const Projects = await import("./pages/Projects/Projects").then((module) => module.default);
      return <Projects projectId={id ? +id : undefined} />;
    },
    title: fTitle("Projects"),
  },
  {
    path: /^\/login$/,
    content: () => import("./pages/Login").then((module) => module.default),
    title: fTitle("Login"),
  },

  // Admin pages
  {
    path: /^\/admin\/projects\/new$/,
    content: () => import("./pages/admin/ManageProject").then((module) => module.default),
    title: fTitle("New Project"),
  },
  {
    path: /^\/admin\/projects\/(\d+)$/,
    async content(id) {
      const ManageProject = await import("./pages/admin/ManageProject").then((module) => module.default);
      return <ManageProject id={+id} />;
    },
    title: fTitle("Edit Project"),
  },

  // Error
  {
    path: /^\/.*/,
    content: () => import("./ErrorPage").then((module) => module.ErrorPage),
    title: fTitle(window.location.pathname),
  },
];
