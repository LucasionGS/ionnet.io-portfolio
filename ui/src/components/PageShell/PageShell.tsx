import React from 'react'
import { AppShell, Avatar, Breadcrumbs, Footer, Group, Header, Image } from "@mantine/core";
import logo from '../../logo.svg';
import "./PageShell.scss";
import Link from '../Router/Link';
import User from '../../models/User';

interface PageShellProps {
  children: React.ReactNode;
  navbar?: React.ReactElement;
}

export default function PageShell(props: PageShellProps) {
  const currentYear = new Date().getFullYear();
  const user = User.getUser();
  return (
    <AppShell
      header={(
        <Header height={48} className="header">
          <Group position='apart'>
            <Group>
              <Link href="/">
                <Image src={logo} height={48} width={48} className="rotate-ion-icon" />
              </Link>
              <div style={{
                width: 16
              }} />
              <Breadcrumbs>
                <Link href="/">Home</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/resume">Resume</Link>
              </Breadcrumbs>
            </Group>
            <Group>
              {
                user && (
                  <Avatar>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                )
              }
            </Group>
          </Group>
        </Header>
      )}
      navbar={props.navbar}
      footer={(
        <Footer height={48} style={{ color: "white" }} px={16}>
          <Group grow position="apart">
            <div>
              <Breadcrumbs>
                <Link
                  href="https://github.com/LucasionGS/ionnet.io-portfolio"
                  title="Repository for this website"
                  external
                >GitHub Repository</Link>
                {/* <Link href="https://toxen.net" external>Toxen.net</Link> */}
              </Breadcrumbs>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>© {currentYear === 2022 ? "" : "2022-"}{currentYear} Ionnet Portfolio</p>
            </div>
          </Group>
        </Footer>
      )}
    >
      {props.children}
    </AppShell>
  )
}
