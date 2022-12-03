import React from "react"
import { Alert, Button, Paper, TextInput } from "@mantine/core";
import { RichTextEditor, Link as TipTapLink } from "@mantine/tiptap";
import PageShell from "../../components/PageShell/PageShell";
import User from "../../models/User";
import { useRouter } from "../../components/Router";

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import Project from "../../models/Project";
import Link from "../../components/Router/Link";

import "../Projects/Projects.scss";

export default function ManageProject(props: { id?: number }) {
  const [id, setId] = React.useState(props.id);
  const [name, setName] = React.useState<string>("Full Project Name");
  const [shortName, setShortName] = React.useState<string>("Project");
  const [description, setDescription] = React.useState<string>("Project Description");
  const [link, setLink] = React.useState<string>("https://");
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<React.ReactNode>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [initialized, setInitialized] = React.useState<boolean>(false);

  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TipTapLink,
      Superscript,
      SubScript,
      Highlight,
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'project-image',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: "Project body",
  });

  React.useEffect(() => {
    if (id && editor) {
      fetch(`/api/projects/${id}`)
        .then(async res => {
          if (res.status !== 200) {
            const error = await res.json();
            setError(error.message);
          } else {
            const project = Object.assign(new Project(), await res.json());
            setName(project.name);
            setShortName(project.shortName);
            setDescription(project.description);
            setLink(project.link);
            editor.commands.setContent(project.body);

            setInitialized(true);
          }
        });
    }
    else {
      setInitialized(true);
    }
  }, [id, editor]);

  function onSubmit() {
    setLoading(true);

    const html = editor?.getHTML();

    if (!html) {
      setError("Body is required");
      setLoading(false);
      return;
    }

    const data = {
      name,
      shortName,
      description,
      link,
      body: html,
    };

    if (id) {
      fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...User.headers
        },
        body: JSON.stringify(data),
      }).then(async res => {
        if (res.ok) {
          setSuccess(
            <Link href={`/projects/${id}`}>
              Project updated
            </Link>
          );
          setError("");
        } else {
          setError("Error updating project");
          setSuccess("");
        }
        setLoading(false);
      });
    } else {
      fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...User.headers
        },
        body: JSON.stringify(data),
      }).then(async res => {
        if (res.ok) {
          const data = await res.json();
          setSuccess(
            <Link href={`/projects/${data.id}`}>
              Project created successfully
            </Link>
          );
          setError("");
        } else {
          setError("Error creating project");
          setSuccess("");
        }
        setLoading(false);
      });
    }
  }

  const user = User.getUser();
  if (!user) {
    window.location.pathname = "/";
    return <></>;
  }

  return (
    <PageShell>
      <Paper px="lg">
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
          <h1>{
            id ? "Edit Project" : "Create Project"
          }</h1>
          <TextInput
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            type="text"
            label="Short Name"
            value={shortName}
            onChange={(e) => setShortName(e.currentTarget.value)}
          />
          <TextInput
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <TextInput
            type="text"
            label="Link"
            value={link}
            onChange={(e) => setLink(e.currentTarget.value)}
          />
          {editor && initialized && (
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                  <RichTextEditor.CodeBlock />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          )}
          <br />
          <Button fullWidth variant="subtle"
            disabled={loading}
            onClick={onSubmit}
          >
            {
              (id ? "Update " : "Create ") + name
            }
          </Button>
          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}
          {success && (
            <Alert color="green" title="Success">
              {success}
            </Alert>
          )}
        </form>
      </Paper>
    </PageShell>
  )
}
