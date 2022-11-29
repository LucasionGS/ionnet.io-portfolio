import { Paper } from '@mantine/core'
import React from 'react'
import PageShell from '../components/PageShell/PageShell'
import Link from '../components/Router/Link'

export default function Home() {
  const age = Math.floor((Date.now() - new Date(2002, 2, 9).getTime()) / 1000 / 60 / 60 / 24 / 365.25)
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
        <p>To see my experiences and skills, please visit my <Link href="/resume">resume</Link>.</p>

        
        <br />
      </Paper>
    </PageShell>
  )
}
