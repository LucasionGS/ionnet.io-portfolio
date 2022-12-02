import { Alert, Button, Paper, TextInput } from "@mantine/core";
import React from "react";
import PageShell from "../components/PageShell/PageShell";
import Link from "../components/Router/Link";
import User from "../models/User";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  return (
    <PageShell>
      <Paper px="lg">
        <br />
        <h1>Login</h1>
        <div>
          <TextInput type="text" label="Username" value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
          <TextInput type="password" label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} />

          <Button disabled={loading} onClick={async () => {
            setLoading(true);
            const res = await fetch("/api/user/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            });
            const data = await res.json();
            if (data.error) {
              setError(data.message);
            } else {
              User.setUser(data);
              window.location.href = "/";
            }
            setLoading(false);
          }}>Login</Button>
          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}
        </div>
        <br />
      </Paper>
    </PageShell>
  )
}
