import React from 'react'
import { AppShell, Breadcrumbs, Footer, Header, Image } from "@mantine/core";
import logo from '../../logo.svg';
import "./PageShell.scss";
import Link from '../Router/Link';

interface PageShellProps {
  children: React.ReactNode;
  navbar?: React.ReactElement;
}

export default function PageShell(props: PageShellProps) {
  return (
    <AppShell
      header={(
        <Header height={48} className="header">
          <Link href="/">
            <Image src={logo} height={48} width={48} className="rotate-ion-icon" />
          </Link>
          <div style={{
            width: 16
          }} />
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
          </Breadcrumbs>
        </Header>
      )}
      navbar={props.navbar}
      footer={(
        <Footer height={48} style={{ color: "white" }} px={8}>
          <p>© 2021 Ionnet Portfolio</p>
        </Footer>
      )}
    >
      {props.children}
    </AppShell>
  )
}
