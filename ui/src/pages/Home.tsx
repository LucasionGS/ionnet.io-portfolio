import { Paper } from "@mantine/core";
import React from "react";
import PageShell from "../components/PageShell/PageShell";
import Link from "../components/Router/Link";
import { age } from "../helper/variables";

export default function Home() {
  return (
    <PageShell>
      <Paper px="lg">
        <br />
        <h1>Home</h1>
        <p>
          My name is Lucas, I'm {age}, and I'm a software developer. I'm currently working on a few projects (Which you can find on this site), including this website itself.
        </p>
        <p>
          I'm also a student at the Technical Education Copenhagen (TEC), where I'm studying development.
        </p>
        <p>
          To see my experiences and skills, please visit my <Link href="/resume">resume</Link>.
        </p>
        <p>
          I have a list of <Link href="/projects">projects</Link> that I've worked or am still working on.
        </p>
        <br />
      </Paper>
    </PageShell>
  )
}
